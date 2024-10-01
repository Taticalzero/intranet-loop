'use server'

import { Formulario } from '@/types/Formulario'
import prisma from '../prisma'

export default async function getSurveys(): Promise<Formulario[]> {
  try {
    const surveys = await prisma.formulario.findMany({
      include: {
        questions: {
          include: {
            opcoes: true,
          },
        },
      },
    })
    return surveys
  } catch (error) {
    console.error('Erro ao trazer dados:', error)
    throw new Error('Falha ao trazer dados')
  }
}
