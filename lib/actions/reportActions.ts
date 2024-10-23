'use server'

import { ReportRegister } from '@/app/intranet/denuncia/_components/dialog-add-report'
import prisma from '../prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { revalidatePath } from 'next/cache'

export async function registerReport(data: ReportRegister) {
  const session = await getServerSession(authOptions)
  await prisma.denuncia.create({
    data: {
      titulo: data.title,
      descricao: data.description,
      status: 'pendente',
      dataCriacao: new Date(),
      usuario: {
        connect: {
          id: Number(session?.user.id),
        },
      },
    },
  })
  revalidatePath('/intranet/denuncia')
}

export async function getReportsUser() {
  const reports = await prisma.denuncia.findMany({
    include: {
      usuario: {
        select: {
          id: true,
          nome: true,
        },
      },
    },
  })
  const formattedReports = reports.map((report) => ({
    id: report.id.toString(), // Converter o id para string
    titulo: report.titulo,
    descricao: report.descricao,
    dataCriacao: report.dataCriacao,
    status: report.status,
    usuario: {
      id: report.usuario.id.toString(), // Converter o id do usuário para string
      nome: report.usuario.nome,
    },
  }))
  return formattedReports
}

export async function getAllReports() {
  const reports = await prisma.denuncia.findMany()
  const formattedReports = reports.map((report) => ({
    id: report.id.toString(), // Converter o id para string
    titulo: report.titulo,
    descricao: report.descricao,
    dataCriacao: report.dataCriacao,
    status: report.status,
  }))
  return formattedReports
}
