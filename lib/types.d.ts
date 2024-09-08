import { Usuario } from '@/types/Usuarios'

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
