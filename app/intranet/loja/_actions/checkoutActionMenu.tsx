import { Button } from '@/app/_components/ui/button'
import { useCartStore } from '@/store'
import { Produto } from '@/types/Produtos'
import { Minus, Plus, Trash2 } from 'lucide-react'

export default function CheckoutActionMenu({ produto }: { produto: Produto }) {
  const { removeProduct, addProduct, deletefromCart } = useCartStore()
  return (
    <div className="flex items-center">
      <Button
        variant="outline"
        size="icon"
        className="h-6 w-6"
        onClick={() => removeProduct(produto)}
      >
        <Minus className="h-3 w-3" />
      </Button>
      <span className="mx-1 text-xs">{produto.estoque}</span>
      <Button
        variant="outline"
        size="icon"
        className="h-6 w-6"
        onClick={() => addProduct(produto)}
      >
        <Plus className="h-3 w-3" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-6 w-6 ml-1"
        onClick={() => deletefromCart(produto)}
      >
        <Trash2 className="h-3 w-3" />
      </Button>
    </div>
  )
}
