const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

async function main() {
  // Hash para senha
  const defaultPassword = await bcrypt.hash(process.env.PASSWORD_RESET, 10)

  // Cria usuarios
  const user1 = await prisma.usuario.create({
    data: {
      nome: 'João Silva',
      email: 'joao@example.com',
      senha: defaultPassword,
      creditos: 3000.0,
      cargo: 'admin',
      imagem: 'https://i.ibb.co/BB5zkTM/loop-logo.jpg',
    },
  })

  const user2 = await prisma.usuario.create({
    data: {
      nome: 'Maria Oliveira',
      email: 'maria@example.com',
      senha: defaultPassword,
      creditos: 900.0,
      cargo: 'user',
      imagem: 'https://i.ibb.co/BB5zkTM/loop-logo.jpg',
    },
  })

  // Cria produtos
  const produto1 = await prisma.produto.create({
    data: {
      nome: 'Produto 1',
      preco: 29.99,
      imagem: 'https://example.com/produto1.jpg',
      estoque: 10,
    },
  })

  const produto2 = await prisma.produto.create({
    data: {
      nome: 'Produto 2',
      preco: 49.99,
      imagem: 'https://example.com/produto2.jpg',
      estoque: 25,
    },
  })

  // Cria compras
  await prisma.compra.create({
    data: {
      usuarioId: user1.id,
      itens: {
        create: [
          {
            produtoId: produto1.id,
            quantidade: 2,
            preco: 29.99,
          },
          {
            produtoId: produto2.id,
            quantidade: 1,
            preco: 49.99,
          },
        ],
      },
    },
  })

  // Cria sessoes para os usuarios
  await prisma.sessao.create({
    data: {
      usuarioId: user1.id,
      sessionToken: 'session-token-1',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    },
  })

  await prisma.sessao.create({
    data: {
      usuarioId: user2.id,
      sessionToken: 'session-token-2',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    },
  })

  // Cria contas para os usuarios
  await prisma.conta.create({
    data: {
      usuarioId: user1.id,
      tipo: 'oauth',
      provedor: 'google',
      contaProvedorId: 'google-12345',
      refresh_token: 'refresh-token-1',
      access_token: 'access-token-1',
      expires_at: Math.floor(Date.now() / 1000) + 3600,
      token_type: 'Bearer',
    },
  })

  await prisma.conta.create({
    data: {
      usuarioId: user2.id,
      tipo: 'oauth',
      provedor: 'facebook',
      contaProvedorId: 'facebook-12345',
      refresh_token: 'refresh-token-2',
      access_token: 'access-token-2',
      expires_at: Math.floor(Date.now() / 1000) + 3600,
      token_type: 'Bearer',
    },
  })

  // Cria verificaçao dos tokens
  await prisma.verificationtoken.create({
    data: {
      identifier: user1.email,
      token: 'verification-token-1',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 2),
    },
  })

  await prisma.verificationtoken.create({
    data: {
      identifier: user2.email,
      token: 'verification-token-2',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 2),
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
