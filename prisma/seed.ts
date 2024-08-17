import { Produto } from '@/types/produtoDTO'
import { Usuario } from '@/types/userDTO'

const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

async function main() {
  const saltRounds = 10
  // Criar usuários
  const usuario1: Usuario = await prisma.usuario.create({
    data: {
      nome: 'John Doe',
      email: 'john.doe@example.com',
      senha: await bcrypt.hash('password123', saltRounds),
      creditos: 100.0,
      cargo: 'User',
      imagem: 'johndoe.png',
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
  })

  const usuario2: Usuario = await prisma.usuario.create({
    data: {
      nome: 'Jane Smith',
      email: 'jane.smith@example.com',
      senha: await bcrypt.hash('password123', saltRounds),
      creditos: 250.0,
      cargo: 'Admin',
      imagem: 'janesmith.png',
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
  })

  // Criar produtos
  const produto1: Produto = await prisma.produto.create({
    data: {
      nome: 'Produto 1',
      preco: 25.0,
      imagem: 'produto1.png',
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
  })

  const produto2: Produto = await prisma.produto.create({
    data: {
      nome: 'Produto 2',
      preco: 50.0,
      imagem: 'produto2.png',
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
  })

  const produto3: Produto = await prisma.produto.create({
    data: {
      nome: 'Produto 3',
      preco: 75.0,
      imagem: 'produto3.png',
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
  })

  // Criar compras
  await prisma.compra.create({
    data: {
      usuarioId: usuario1.id,
      data: new Date(),
      itens: {
        create: [
          {
            produtoId: produto1.id,
            quantidade: 2,
            preco: produto1.preco,
          },
          {
            produtoId: produto2.id,
            quantidade: 1,
            preco: produto2.preco,
          },
        ],
      },
    },
  })

  await prisma.compra.create({
    data: {
      usuarioId: usuario2.id,
      data: new Date(),
      itens: {
        create: [
          {
            produtoId: produto2.id,
            quantidade: 3,
            preco: produto2.preco,
          },
          {
            produtoId: produto3.id,
            quantidade: 1,
            preco: produto3.preco,
          },
        ],
      },
    },
  })

  console.log('Banco de dados populado com sucesso!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
