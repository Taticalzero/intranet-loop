export interface Produto {
  id: number
  nome: string
  preco: number
  imagem: string
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date | null
}
