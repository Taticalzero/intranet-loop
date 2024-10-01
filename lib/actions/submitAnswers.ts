'use server'

import prisma from '../prisma'

export interface Answer {
  questionId: number
  answer: string
}

export async function submitAnswers(answers: Answer[]) {
  try {
    const createdAnswers = await prisma.resposta.createMany({
      data: answers.map((answer) => ({
        questaoId: answer.questionId,
        resposta: answer.answer,
      })),
    })

    return createdAnswers
  } catch (error) {
    console.error('Erro ao salvar as respostas:', error)
    throw new Error('Não foi possível salvar as respostas')
  }
}
