export type Denuncia = {
  id: string
  titulo: string
  descricao: string
  dataCriacao: Date
  status: 'pendente' | 'em_analise' | 'resolvida'
}
