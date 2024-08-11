const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function populandoBanco() {
  // Criar cargos
  const cargoAdmin = await prisma.cargo.create({
    data: { nome_cargo: "Admin" },
  });

  const cargoUser = await prisma.cargo.create({
    data: { nome_cargo: "User" },
  });

  // Criar usuários
  const usuario1 = await prisma.usuario.create({
    data: {
      nome: "John Doe",
      email: "john.doe@example.com",
      creditos: 990.0,
      cargoId: cargoUser.id,
    },
  });

  const usuario2 = await prisma.usuario.create({
    data: {
      nome: "Jane Smith",
      email: "jane.smith@example.com",
      creditos: 500.0,
      cargoId: cargoAdmin.id,
    },
  });

  // Criar produtos
  const produto1 = await prisma.produto.create({
    data: {
      nome: "Produto 1",
      preco: 25.0,
      imagem: "produto1.png",
    },
  });

  const produto2 = await prisma.produto.create({
    data: {
      nome: "Produto 2",
      preco: 50.0,
      imagem: "produto2.png",
    },
  });

  const produto3 = await prisma.produto.create({
    data: {
      nome: "Produto 3",
      preco: 75.0,
      imagem: "produto3.png",
    },
  });

  // Criar compras
  const compra1 = await prisma.compra.create({
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
  });

  const compra2 = await prisma.compra.create({
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
  });

  console.log("Banco de dados populado com sucesso!");
}

populandoBanco()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
