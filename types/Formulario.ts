export type QuestionType = 'short' | 'paragraph' | 'multiple'

export interface Question {
  id: string
  type: QuestionType
  title: string
  options?: Opcao[]
}

export interface Formulario {
  id: string
  titulo: string
  dataLimite: Date
  questions: Question[]
}

export interface Opcao {
  id: number
  valor: string
  questaoId: number
}

export type FormPage = {
  id: number
  titulo: string
  dataLimite: Date
  createdAt?: Date
  updatedAt?: Date
  questions: QuestaoPage[]
  respondido: boolean
}

export type QuestaoPage = {
  id: number
  formularioId?: number
  tipo: QuestionType
  titulo: string
  createdAt?: Date
  updatedAt?: Date
  opcoes?: Opcao[]
}
