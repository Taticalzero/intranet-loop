import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import prisma from '@/lib/prisma'
import NextAuth from 'next-auth/next'
import { Usuario } from '@prisma/client'

export const authOptions: AuthOptions = {
  pages: {
    signIn: '/auth/login',
  },
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        const user = await prisma.usuario.findUnique({
          where: {
            email: credentials?.email,
          },
        })
        if (!user) throw new Error('Nome ou senha incorretos')
        if (!credentials?.password)
          throw new Error('Informe sua senha corretamente')

        const isPassowrdCorrect = await bcrypt.compare(
          credentials.password,
          user.senha
        )

        if (!isPassowrdCorrect) throw new Error('Nome ou senha incorretos')
        if (!user.emailVerificado)
          throw new Error('Email ainda não foi verificado')

        return {
          id: String(user.id),
          nome: user.nome,
          email: user.email,
          cargo: user.cargo,
          imagem: user.imagem,
          creditos: user.creditos.toNumber(),
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update' && session.user.creditos) {
        token.user.creditos = session.user.creditos
      }
      if (user) token.user = user as unknown as Usuario
      return token
    },
    async session({ session, token }) {
      session.user = token.user
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
