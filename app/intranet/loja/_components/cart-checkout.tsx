'use client'

import { Button } from '@/app/_components/ui/button'
import { useCartStore } from '@/store'
import { ShoppingCart } from 'lucide-react'
import CheckoutActionMenu from '../_actions/checkoutActionMenu'
import { Session } from 'next-auth'
import BuyProduct from '@/lib/actions/buyProduct'
import { useSession } from 'next-auth/react'
import { toast } from '@/app/_components/ui/use-toast'
import { ScrollArea } from '@/app/_components/ui/scroll-area'

type UserData = {
  user: Session['user']
}

export default function CartCheckout({ user }: UserData) {
  const useStore = useCartStore()
  const { data: session, update } = useSession()

  const totalCarrinho = useStore.cart.reduce(
    (total, item) => total + item.preco * item.estoque,
    0
  )
  const quantidadeTotalCarrinho = useStore.cart.reduce(
    (total, item) => total + item.estoque,
    0
  )

  const finishCheckout = async () => {
    try {
      // Verifica se o usuário tem créditos suficientes
      if (Number(user.creditos) < totalCarrinho) {
        alert('Créditos insuficientes!')
        return
      }

      // Chama a função para finalizar a compra
      const novoSaldo = await BuyProduct(
        Number(user.id),
        totalCarrinho,
        useStore.cart
      )

      await update({
        ...session,
        user: {
          ...session?.user,
          creditos: novoSaldo, // Atualiza o saldo de créditos na sessão
        },
      })
      useStore.clearCart() // Limpa o carrinho após a compra
      useStore.toogleCart() // Fecha o carrinho
      toast({
        title: 'Compra realizada com sucesso!',
        description: `Seu novo saldo é: Pts ${novoSaldo.toFixed(2)}`,
      })
    } catch (error) {
      console.error(error)
      alert('Ocorreu um erro ao finalizar a compra. Tente novamente.')
    }
  }

  return (
    <div
      className={`fixed cursor-pointer top-0 right-0 h-full w-64 bg-background shadow-lg transform transition-transform duration-300 ease-in-out ${useStore.isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <Button
        variant="outline"
        size="icon"
        className="absolute -left-12 top-4"
        onClick={() => useStore.toogleCart()}
      >
        <ShoppingCart className="h-4 w-4" />
        {quantidadeTotalCarrinho > 0 && (
          <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {quantidadeTotalCarrinho}
          </span>
        )}
      </Button>
      <div className="p-4 h-full flex flex-col">
        <h2 className="text-xl font-bold mb-4">Carrinho</h2>
        <ScrollArea className="flex-grow">
          {useStore.cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between mb-2 text-sm"
            >
              <div>
                <p className="font-medium">{item.nome}</p>
                <p className="text-xs text-muted-foreground">
                  Pts {item.preco.toFixed(2)} x {item.estoque}
                </p>
              </div>
              <CheckoutActionMenu produto={item} />
            </div>
          ))}
        </ScrollArea>
        {useStore.cart.length > 0 && (
          <div className="mt-4">
            <p className="text-lg font-bold">
              Total: Pts {totalCarrinho.toFixed(2)}{' '}
            </p>

            <Button onClick={() => finishCheckout()} className="w-full mt-2">
              Finalizar Compra
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
