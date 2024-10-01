'use server'

import { revalidatePath } from 'next/cache'
import prisma from '../prisma'
import { addDays } from 'date-fns'
import { Question } from '@/store'

export interface CreateSurveyData {
  title: string
  questions: Question[]
}

export default async function createSurvey(data: CreateSurveyData) {
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
                    valor: option,
                  })),
                }
              : undefined,
          })),
        },
      },
    })

    console.log('Formulário salvo com sucesso')
    revalidatePath('/intranet/clima-gestao')
  } catch (error) {
    console.log(error)
  }
}
