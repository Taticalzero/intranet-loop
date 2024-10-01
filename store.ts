import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Produto } from './types/Produtos'

type CartState = {
  cart: Produto[]
  addProduct: (product: Produto) => void
  removeProduct: (product: Produto) => void
  deletefromCart: (product: Produto) => void
  clearCart: () => void
  isOpen: boolean
  toogleCart: () => void
}
const LIMITE_ESTOQUE = 10

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      isOpen: false,
      addProduct: (product: Produto) =>
        set((state) => {
          const productInCart = state.cart.find(
            (item) => item.id === product.id
          )
          if (productInCart) {
            if (productInCart.estoque >= LIMITE_ESTOQUE) {
              return state
            }
            const updatedCart = state.cart.map((item) => {
              if (item.id === product.id) {
                return { ...item, estoque: item.estoque + 1 }
              }
              return item
            })
            return { cart: updatedCart }
          } else {
            return { cart: [...state.cart, { ...product, estoque: 1 }] }
          }
        }),
      toogleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      removeProduct: (product: Produto) =>
        set((state) => {
          const productInCart = state.cart.find(
            (item) => item.id === product.id
          )
          if (productInCart) {
            const updatedCart = state.cart
              .map((item) => {
                if (item.id === product.id) {
                  return { ...item, estoque: item.estoque - 1 }
                }
                return item
              })
              .filter((item) => item.estoque > 0)
            return { cart: updatedCart }
          }
          return { cart: state.cart }
        }),
      deletefromCart: (product: Produto) =>
        set((state) => {
          const updatedCart = state.cart.filter(
            (item) => item.id !== product.id
          )
          return { cart: updatedCart }
        }),
      clearCart: () => set({ cart: [] }),
    }),
    { name: 'cart-storage' }
  )
)

export type QuestionType = 'short' | 'paragraph' | 'multiple'

export interface Question {
  id: string
  type: QuestionType
  title: string
  options?: string[]
}

interface FormState {
  formTitle: string
  questions: Question[]
  setFormTitle: (title: string) => void
  addQuestion: () => void
  updateQuestion: (id: string, updates: Partial<Question>) => void
  removeQuestion: (id: string) => void
  addOption: (questionId: string) => void
  updateOption: (questionId: string, optionIndex: number, value: string) => void
  removeOption: (questionId: string, optionIndex: number) => void
  clearQuestions: () => void
}

export const useSurveyStore = create<FormState>()(
  persist(
    (set) => ({
      formTitle: '',
      questions: [],
      setFormTitle: (title) => set(() => ({ formTitle: title })),
      addQuestion: () =>
        set((state) => ({
          questions: [
            ...state.questions,
            {
              id: Date.now().toString(),
              type: 'short',
              title: '',
            },
          ],
        })),

      updateQuestion: (id, updates) =>
        set((state) => ({
          questions: state.questions.map((q) =>
            q.id === id ? { ...q, ...updates } : q
          ),
        })),

      removeQuestion: (id) =>
        set((state) => ({
          questions: state.questions.filter((q) => q.id !== id),
        })),

      addOption: (questionId) =>
        set((state) => ({
          questions: state.questions.map((q) => {
            if (q.id === questionId) {
              return {
                ...q,
                options: [
                  ...(q.options || []),
                  `Opção ${(q.options?.length || 0) + 1}`,
                ],
              }
            }
            return q
          }),
        })),

      updateOption: (questionId, optionIndex, value) =>
        set((state) => ({
          questions: state.questions.map((q) => {
            if (q.id === questionId && q.options) {
              const newOptions = [...q.options]
              newOptions[optionIndex] = value
              return { ...q, options: newOptions }
            }
            return q
          }),
        })),

      removeOption: (questionId, optionIndex) =>
        set((state) => ({
          questions: state.questions.map((q) => {
            if (q.id === questionId && q.options) {
              return {
                ...q,
                options: q.options.filter((_, index) => index !== optionIndex),
              }
            }
            return q
          }),
        })),

      clearQuestions: () =>
        set(() => ({
          questions: [],
        })),
    }),
    { name: 'survey-storage' }
  )
)
