export interface Usuario {
  id: number
  nome: string
  email: string
  senha: string
  creditos: number
  cargo: string
  imagem: string
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date | null
}
