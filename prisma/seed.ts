const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {
  // Criar usuários
  const usuario1 = await prisma.usuario.create({
    data: {
      nome: "John Doe",
      email: "john.doe@example.com",
      creditos: 100.0,
      cargo: "User",
      imagem: "johndoe.png",
    },
  })

  const usuario2 = await prisma.usuario.create({
    data: {
      nome: "Jane Smith",
      email: "jane.smith@example.com",
      creditos: 250.0,
      cargo: "Admin",
      imagem: "janesmith.png",
    },
  })

  // Criar produtos
  const produto1 = await prisma.produto.create({
    data: {
      nome: "Produto 1",
      preco: 25.0,
      imagem: "produto1.png",
    },
  })

  const produto2 = await prisma.produto.create({
    data: {
      nome: "Produto 2",
      preco: 50.0,
      imagem: "produto2.png",
    },
  })

  const produto3 = await prisma.produto.create({
    data: {
      nome: "Produto 3",
      preco: 75.0,
      imagem: "produto3.png",
    },
  })

  // Criar compras
  await prisma.compra.create({
    data: {
      usuarioId: usuario1.id,
      data: new Date(),
      itens: {
        create: [
          { produtoId: produto1.id, quantidade: 2, preco: produto1.preco },
          { produtoId: produto2.id, quantidade: 1, preco: produto2.preco },
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
          { produtoId: produto2.id, quantidade: 3, preco: produto2.preco },
          { produtoId: produto3.id, quantidade: 1, preco: produto3.preco },
        ],
      },
    },
  })

  console.log("Banco de dados populado com sucesso!")
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
