'use client'
import { Card, CardContent } from '@/app/_components/ui/card'
import CartCheckout from './cart-checkout'
import AddCartProduct from '../_actions/addCart'
import { Produto } from '@/types/Produtos'
import Image from 'next/image'
import { Session } from 'next-auth'

interface CardMarketProps {
  produtos: Produto[]
  user: Session['user']
}
export default function CardMarket({ produtos, user }: CardMarketProps) {
  return (
    <div className="container mx-auto p-4 flex flex-col">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {produtos.map((produto) => (
          <Card key={produto.id} className="flex flex-col">
            <CardContent className="p-4">
              <Image
                src={produto.imagem}
                alt={produto.nome}
                className="object-cover"
                width={500}
                height={500}
              />
              <h3 className="font-semibold text-sm mb-1">{produto.nome}</h3>
              <p className="text-lg font-bold mb-1">
                Pontos : {''}
                {Intl.NumberFormat('pt-BR', {
                  style: 'decimal',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(Number(produto.preco))}
              </p>
              <p className="text-xs text-muted-foreground">
                Estoque: {produto.estoque} Unidade(s)
              </p>
            </CardContent>
            <AddCartProduct produto={produto} />
          </Card>
        ))}
      </div>
      <CartCheckout user={user} />
    </div>
  )
}
