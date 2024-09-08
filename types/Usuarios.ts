import { Decimal } from '@prisma/client/runtime/library'

export type Usuario = {
  id: number
  nome: string
  email: string
  cargo: string
  imagem: string | null
  creditos: Decimal
}
