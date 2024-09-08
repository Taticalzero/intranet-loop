/* eslint-disable no-unused-vars */
'use server'

import prisma from '../prisma'
import { UserRegister } from '@/app/auth/register/register-form'
import { checkDomain } from '@/utils/checkDomain'
import * as bcrypt from 'bcrypt'
import {
  compileActivationTemplate,
  compileResetPassTemplate,
  sendMail,
} from '../mail'
import { signJwt, verifyJwt } from '../jwt'

type ActivationUser = (
  jwtUserId: string
) => Promise<'userNotExist' | 'alreadyActivated' | 'success'>

type ResetPasswordFucn = (
  jwtUserId: string,
  password: string
) => Promise<'userNotExist' | 'success'>

export async function registerUser(user: UserRegister) {
  const name = user.nome + ' ' + user.sobrenome
  const password = (await bcrypt.hash(user.password, 10)) as string
  const cargo = checkDomain(user.email)
  const result = await prisma.usuario.create({
    data: {
      nome: name,
      email: user.email,
      senha: password,
      creditos: 1000,
      cargo: cargo,
      imagem: 'https://i.ibb.co/BB5zkTM/loop-logo.jpg',
    },
  })

  const jwtUserId = signJwt({ id: result.id })

  const activationUrl = `${process.env.NEXTAUTH_URL}/auth/activation/${jwtUserId}`
  const body = compileActivationTemplate(result.nome as string, activationUrl)

  await sendMail({
    to: user.email,
    subject: 'Bem vindo(a) a Intranet Loop , Ative sua Conta!',
    body: body,
  })
}

export const activateUser: ActivationUser = async (jwtUserId) => {
  const payload = verifyJwt(jwtUserId)
  const userId = payload?.id
  const user = await prisma.usuario.findUnique({
    where: {
      id: userId,
    },
  })
  if (!user) return 'userNotExist'
  if (user.emailVerificado) return 'alreadyActivated'
  await prisma.usuario.update({
    where: {
      id: userId,
    },
    data: {
      emailVerificado: new Date(),
    },
  })
  return 'success'
}

export async function forgotPassword(email: string) {
  const user = await prisma.usuario.findUnique({
    where: {
      email: email,
    },
  })

  if (!user) throw new Error('Este usuário não existe!')

  const jwtUserId = signJwt({
    id: user.id,
  })

  const resetPassUrl = `${process.env.NEXTAUTH_URL}/auth/resetPass/${jwtUserId}`
  const body = compileResetPassTemplate(user.nome as string, resetPassUrl)
  const sendResult = await sendMail({
    to: user.email,
    subject: 'Recupere sua Senha',
    body: body,
  })
  return sendResult
}

export const resetPassword: ResetPasswordFucn = async (jwtUserId, password) => {
  const payload = verifyJwt(jwtUserId)
  if (!payload) return 'userNotExist'
  const userId = payload.id
  const user = await prisma.usuario.findUnique({
    where: {
      id: userId,
    },
  })
  if (!user) return 'userNotExist'

  const result = await prisma.usuario.update({
    where: {
      id: userId,
    },
    data: {
      senha: await bcrypt.hash(password, 10),
    },
  })
  if (result) return 'success'
  else throw new Error('Algo deu errado , realize a validação novamente')
}
