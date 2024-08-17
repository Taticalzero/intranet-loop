export interface UsuarioCompra {
  id: number
  compraId: number
  produtoId: number
  quantidade: number
  preco: number
  created_at?: Date
}
