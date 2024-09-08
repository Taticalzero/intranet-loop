'use server'

import { Produto } from '@/types/Produtos'
import prisma from '../prisma'
import { revalidatePath } from 'next/cache'
import { useSession } from 'next-auth/react'
export default async function BuyProduct(
  userId: number | string,
  total: number,
  cart: Produto[]
) {
  // Converte userId para número caso esteja como string
  const id = typeof userId === 'string' ? parseInt(userId) : userId

  // Obtém os dados do usuário
  const user = await prisma.usuario.findUnique({
    where: { id },
    select: { creditos: true },
  })
  // Verifica se o usuário existe
  if (!user) throw new Error('Usuário não encontrado')

  // Verifica se o usuário tem saldo suficiente
  if (Number(user.creditos) < total) {
    throw new Error('Créditos insuficientes')
  }

  // Calcula o novo saldo de créditos
  const novoSaldo = Number(user.creditos) - total

  // Inicia a transação para atualizar o saldo do usuário e o estoque dos produtos
  await prisma.$transaction([
    // Atualiza o saldo do usuário
    prisma.usuario.update({
      where: { id },
      data: { creditos: novoSaldo },
    }),
    // Registra a compra
    prisma.compra.create({
      data: {
        usuarioId: id,
        itens: {
          create: cart.map((item) => ({
            produtoId: item.id,
            quantidade: item.estoque,
            preco: item.preco,
          })),
        },
      },
    }),
    // Atualiza o estoque dos produtos
    ...cart.map((item) =>
      prisma.produto.update({
        where: { id: item.id },
        data: { estoque: { decrement: item.estoque } },
      })
    ),
  ])

  // Atualiza o cache
  revalidatePath('/intranet/loja')
  return novoSaldo
}
