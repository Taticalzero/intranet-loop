'use server'

import { revalidatePath } from 'next/cache'
import prisma from '../prisma'
import { addDays } from 'date-fns'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth/next'
import { QuestaoPage, Question } from '@/types/Formulario'

export interface CreateSurveyData {
  title: string
  questions: Question[]
}

export interface Answer {
  questionId: number
  answer: string
}
export async function getSurveysForms() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      throw new Error('Usuário não autenticado.')
    }

    const userId = session.user.id

    const surveys = await prisma.formulario.findMany({
      include: {
        questions: {
          include: {
            opcoes: true,
          },
        },
        FormularioResposta: true,
      },
    })

    const surveysWithRespondido = surveys.map((survey) => ({
      ...survey,
      respondido: survey.FormularioResposta.some(
        (resposta) => resposta.userId === String(userId)
      ),
    }))

    revalidatePath('/intranet/clima-gestao')

    return surveysWithRespondido
  } catch (error) {
    console.error('Erro ao trazer dados:', error)
    throw new Error('Falha ao trazer dados')
  }
}
export async function createSurvey(data: CreateSurveyData) {
  const deadline = addDays(new Date(), 7)
  try {
    const survey = await prisma.formulario.create({
      data: {
        titulo: data.title,
        dataLimite: deadline,
        questions: {
          create: data.questions.map((question) => ({
            titulo: question.title,
            tipo: question.type,
            opcoes: question.options
              ? {
                  create: question.options.map((option) => ({
                    valor: option.valor,
                  })),
                }
              : undefined,
          })),
        },
      },
    })
    revalidatePath('/intranet/clima-gestao')
    return survey
  } catch (error) {
    console.log(error)
  }
}

export async function submitAnswers(answers: Answer[], formularioId: number) {
  const session = await getServerSession(authOptions)

  if (!session?.user.id) {
    throw new Error('Usuario não autenticado !')
  }

  const existingResponse = await prisma.formularioResposta.findUnique({
    where: {
      formularioId_userId: {
        formularioId,
        userId: String(session.user.id),
      },
    },
  })

  if (existingResponse) {
    return { error: 'Você já respondeu a este formulário.' }
  }

  try {
    const formattedAnswers = answers.map((answer) => ({
      questionId: answer.questionId,
      answer: answer.answer,
    }))

    await prisma.formularioResposta.create({
      data: {
        formularioId,
        userId: String(session.user.id),
        respostas: formattedAnswers,
      },
    })
    revalidatePath('/intranet/clima-gestao')
    return { success: 'Formulário enviado com sucesso!' }
  } catch (error) {
    return { error: 'Erro ao salvar as respostas, tente novamente mais tarde.' }
  }
}

export async function deleteSurvey(formularioId: number) {
  try {
    // Deletar as respostas associadas ao formulário
    await prisma.formularioResposta.deleteMany({
      where: {
        formularioId,
      },
    })

    // Deletar as opções associadas às questões do formulário
    await prisma.opcao.deleteMany({
      where: {
        questao: {
          formularioId,
        },
      },
    })

    // Deletar as questões associadas ao formulário
    await prisma.questao.deleteMany({
      where: {
        formularioId,
      },
    })

    // Finalmente, deletar o formulário
    await prisma.formulario.delete({
      where: {
        id: formularioId,
      },
    })
    revalidatePath('/intranet/clima-gestao')
    return { success: true, message: 'Formulário deletado com sucesso' }
  } catch (error) {
    console.error('Erro ao deletar o formulário:', error)
    throw new Error('Erro ao deletar o formulário')
  }
}

export async function updateSurvey(
  formularioId: number,
  titulo: string,
  questions: QuestaoPage[]
) {
  try {
    // Atualizar o título do formulário, se fornecido
    if (titulo) {
      await prisma.formulario.update({
        where: { id: formularioId },
        data: { titulo },
      })
    }

    // Atualizar ou criar as questões e opções
    if (questions && questions.length > 0) {
      for (const question of questions) {
        if (question.id) {
          // Atualizar a questão existente
          await prisma.questao.update({
            where: { id: question.id },
            data: {
              titulo: question.titulo,
              tipo: question.tipo,
            },
          })

          // Atualizar ou criar opções para a questão existente
          if (question.opcoes && question.opcoes.length > 0) {
            for (const opcao of question.opcoes) {
              if (opcao.id) {
                // Atualizar a opção existente
                await prisma.opcao.update({
                  where: { id: opcao.id },
                  data: { valor: opcao.valor },
                })
              } else {
                // Criar uma nova opção
                await prisma.opcao.create({
                  data: {
                    valor: opcao.valor,
                    questaoId: question.id,
                  },
                })
              }
            }
          }
        } else {
          // Criar uma nova questão
          const newQuestion = await prisma.questao.create({
            data: {
              titulo: question.titulo,
              tipo: question.tipo,
              formularioId: formularioId,
            },
          })

          // Criar as opções associadas à nova questão
          if (question.opcoes && question.opcoes.length > 0) {
            for (const opcao of question.opcoes) {
              await prisma.opcao.create({
                data: {
                  valor: opcao.valor,
                  questaoId: newQuestion.id,
                },
              })
            }
          }
        }
      }
    }
    revalidatePath('/intranet/clima-gestao')
    return { success: true, message: 'Formulário atualizado com sucesso!' }
  } catch (error) {
    console.error('Erro ao editar o formulário:', error)
    throw new Error('Erro ao editar o formulário')
  }
}

export async function getSurveyChartData() {
  // Contar o total de respostas
  const totalRespostas = await prisma.formularioResposta.count()

  // Contar o total de formulários
  const totalFormularios = await prisma.formulario.count()

  return { totalRespostas, totalFormularios }
}
