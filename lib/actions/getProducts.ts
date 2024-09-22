'use server'

import { Produto } from '@/types/Produtos'
import prisma from '../prisma'
import { revalidatePath } from 'next/cache'
export default async function getProducts(): Promise<Produto[]> {
  try {
    const produtos = await prisma.produto.findMany()

    const produtosFormatados = produtos.map((produto) => ({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco.toNumber(),
      imagem: produto.imagem,
      estoque: produto.estoque,
    }))
    return produtosFormatados
  } catch {
    throw new Error('Erro ao buscar os produtos')
  }
}
