'use server'
import { Compras } from '@/types/Compras'
import prisma from '../prisma'

export default async function getPurchases(userId: string): Promise<Compras[]> {
  try {
    const purchases = await prisma.usuarioCompra.findMany({
      where: {
        compra: {
          usuarioId: Number(userId),
        },
      },
      include: {
        produto: true,
      },
    })
    const formatPurchases = purchases.map((purchase) => ({
      id: purchase.id,
      nome: purchase.produto.nome,
      quantidade: purchase.quantidade,
      preco: purchase.produto.preco.toNumber(),
    }))
    return formatPurchases
  } catch (error) {
    throw new Error('Erro ao buscar as compras')
  }
}
