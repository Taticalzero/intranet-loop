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
