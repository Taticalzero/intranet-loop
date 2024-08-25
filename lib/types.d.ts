/* eslint-disable no-unused-vars */
import { Usuario } from '@prisma/client'

declare module 'next-auth' {
  interface Session {
    user: Usuario
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: Usuario
  }
}
