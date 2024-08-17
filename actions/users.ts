'use server'
import { z } from 'zod'

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const UserSchema = z.object({
  id: z.number().int(),
  email: z
    .string({
      required_error: 'Email é Obrigatório',
    })
    .email(),
  senha: z
    .string({
      required_error: 'Senha é Obrigatória',
    })
    .min(8, {
      message: 'Senha deve ter pelo menos 8 caracteres',
    }),
  creditos: z.number(),
  cargo: z.string(),
  imagem: z.string(),
  nome: z.string(),
})

const CreatedUser = UserSchema.omit({
  cargo: true,
  creditos: true,
  id: true,
  imagem: true,
})

export async function createUser(user: FormData) {
  const { email, senha, nome } = CreatedUser.parse({
    nome: user.get('nome'),
    email: user.get('email'),
    senha: user.get('senha'),
  })

  try {
    await prisma.usuario.create({
      data: {
        nome: nome,
        senha: senha,
        email: email,
        creditos: 1000.0,
        cargo: 'User',
        imagem: 'johndoe.png',
      },
    })
  } catch (error) {
    console.error(error)
    throw new Error('Erro ao cadastrar o usuário')
  }
}

export async function loginUser(user: FormData) {
  console.log(user)
}

export async function recoveryPassword(user: FormData) {
  console.log(user)
}
