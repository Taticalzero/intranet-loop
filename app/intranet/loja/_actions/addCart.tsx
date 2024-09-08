'use client'

import { Button } from '@/app/_components/ui/button'
import { CardFooter } from '@/app/_components/ui/card'
import { useCartStore } from '@/store'
import { Produto } from '@/types/Produtos'

export default function AddCartProduct({ produto }: { produto: Produto }) {
  const { addProduct } = useCartStore()

  return (
    <CardFooter className="p-2">
      <Button
        onClick={() => addProduct(produto)}
        className="w-full text-xs py-1"
        disabled={produto.estoque === 0}
      >
        Adicionar ao Carrinho
      </Button>
    </CardFooter>
  )
}
