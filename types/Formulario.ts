type Opcao = {
  id: number
  createdAt: Date
  updatedAt: Date
  questaoId: number
  valor: string
}

export type Questao = {
  id: number
  titulo: string
  createdAt: Date
  updatedAt: Date
  formularioId: number
  tipo: string
  opcoes: Opcao[]
}

export type Formulario = {
  id: number
  titulo: string
  dataLimite: Date
  createdAt: Date
  updatedAt: Date
  questions: Questao[]
}
