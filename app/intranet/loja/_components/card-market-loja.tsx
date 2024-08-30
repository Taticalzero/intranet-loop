'use client'

import { useState } from 'react'
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react'
import Image from 'next/image'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/_components/ui/card'
import { Button } from '@/app/_components/ui/button'
import { ScrollArea } from '@/app/_components/ui/scroll-area'

// Tipo para os produtos
type Produto = {
  id: number
  nome: string
  preco: number
  imagem: string
  estoque: number
}

// Tipo para os itens no carrinho
type ItemCarrinho = Produto & { quantidade: number }

// Lista de produtos da loja
const produtosIniciais: Produto[] = [
  {
    id: 1,
    nome: 'Camiseta',
    preco: 29.99,
    imagem: '/placeholder.svg?height=200&width=200',
    estoque: 10,
  },
  {
    id: 2,
    nome: 'Calça',
    preco: 59.99,
    imagem: '/placeholder.svg?height=200&width=200',
    estoque: 8,
  },
  {
    id: 3,
    nome: 'Tênis',
    preco: 99.99,
    imagem: '/placeholder.svg?height=200&width=200',
    estoque: 5,
  },
  {
    id: 4,
    nome: 'Boné',
    preco: 19.99,
    imagem: '/placeholder.svg?height=200&width=200',
    estoque: 15,
  },
  {
    id: 5,
    nome: 'Meia',
    preco: 9.99,
    imagem: '/placeholder.svg?height=200&width=200',
    estoque: 20,
  },
  {
    id: 6,
    nome: 'Jaqueta',
    preco: 89.99,
    imagem: '/placeholder.svg?height=200&width=200',
    estoque: 7,
  },
  {
    id: 7,
    nome: 'Shorts',
    preco: 39.99,
    imagem: '/placeholder.svg?height=200&width=200',
    estoque: 12,
  },
  {
    id: 8,
    nome: 'Vestido',
    preco: 79.99,
    imagem: '/placeholder.svg?height=200&width=200',
    estoque: 6,
  },
  {
    id: 9,
    nome: 'Saia',
    preco: 49.99,
    imagem: '/placeholder.svg?height=200&width=200',
    estoque: 9,
  },
  {
    id: 10,
    nome: 'Blusa',
    preco: 34.99,
    imagem: '/placeholder.svg?height=200&width=200',
    estoque: 11,
  },
]

const ITENS_POR_PAGINA = 6
export default function CardMarket() {
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([])
  const [produtos, setProdutos] = useState<Produto[]>(produtosIniciais)
  const [carrinhoAberto, setCarrinhoAberto] = useState(false)
  const [paginaAtual, setPaginaAtual] = useState(1)

  const totalPaginas = Math.ceil(produtos.length / ITENS_POR_PAGINA)
  const produtosPaginados = produtos.slice(
    (paginaAtual - 1) * ITENS_POR_PAGINA,
    paginaAtual * ITENS_POR_PAGINA
  )

  const atualizarEstoque = (produtoId: number, quantidade: number) => {
    setProdutos((produtosAtuais) =>
      produtosAtuais.map((produto) =>
        produto.id === produtoId
          ? { ...produto, estoque: produto.estoque - quantidade }
          : produto
      )
    )
  }

  const adicionarAoCarrinho = (produto: Produto) => {
    setCarrinho((carrinhoAtual) => {
      const itemExistente = carrinhoAtual.find((item) => item.id === produto.id)
      if (itemExistente) {
        const novaQuantidade = Math.min(
          itemExistente.quantidade + 1,
          produto.estoque
        )
        atualizarEstoque(produto.id, novaQuantidade - itemExistente.quantidade)
        return carrinhoAtual.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: novaQuantidade }
            : item
        )
      }
      atualizarEstoque(produto.id, 1)
      return [...carrinhoAtual, { ...produto, quantidade: 1 }]
    })
  }
  const removerDoCarrinho = (id: number) => {
    const itemRemovido = carrinho.find((item) => item.id === id)
    if (itemRemovido) {
      atualizarEstoque(id, -itemRemovido.quantidade)
      setCarrinho((carrinhoAtual) =>
        carrinhoAtual.filter((item) => item.id !== id)
      )
    }
  }

  const atualizarQuantidade = (id: number, delta: number) => {
    setCarrinho((carrinhoAtual) =>
      carrinhoAtual
        .map((item) => {
          if (item.id === id) {
            const novaQuantidade = Math.max(
              0,
              Math.min(item.quantidade + delta, item.estoque + item.quantidade)
            )
            atualizarEstoque(id, novaQuantidade - item.quantidade)
            return { ...item, quantidade: novaQuantidade }
          }
          return item
        })
        .filter((item) => item.quantidade > 0)
    )
  }

  const totalCarrinho = carrinho.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0
  )

  return (
    <div className="container mx-auto p-4 flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-grow">
        {produtosPaginados.map((produto) => (
          <Card key={produto.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{produto.nome}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <Image
                src={produto.imagem}
                alt={produto.nome}
                width={200}
                height={200}
                className="w-full h-48 object-cover mb-4"
              />
              <p className="text-2xl font-bold">
                R$ {produto.preco.toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Em estoque: {produto.estoque}
              </p>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => adicionarAoCarrinho(produto)}
                className="w-full"
                disabled={
                  carrinho.find((item) => item.id === produto.id)
                    ?.quantidade === produto.estoque
                }
              >
                Adicionar ao Carrinho
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-8 space-x-4">
        <Button
          onClick={() => setPaginaAtual((prev) => Math.max(prev - 1, 1))}
          disabled={paginaAtual === 1}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
        </Button>
        <span className="flex items-center">
          Página {paginaAtual} de {totalPaginas}
        </span>
        <Button
          onClick={() =>
            setPaginaAtual((prev) => Math.min(prev + 1, totalPaginas))
          }
          disabled={paginaAtual === totalPaginas}
        >
          Próxima <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-background shadow-lg transform transition-transform duration-300 ease-in-out ${carrinhoAberto ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <Button
          variant="outline"
          size="icon"
          className="absolute -left-12 top-4"
          onClick={() => setCarrinhoAberto(!carrinhoAberto)}
        >
          <ShoppingCart />
        </Button>
        <div className="p-4 h-full flex flex-col">
          <h2 className="text-2xl font-bold mb-4">Carrinho</h2>
          <ScrollArea className="flex-grow">
            {carrinho.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between mb-2"
              >
                <div>
                  <p>{item.nome}</p>
                  <p className="text-sm text-muted-foreground">
                    R$ {item.preco.toFixed(2)} x {item.quantidade}
                  </p>
                </div>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => atualizarQuantidade(item.id, -1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="mx-2">{item.quantidade}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => atualizarQuantidade(item.id, 1)}
                    disabled={item.quantidade === item.estoque}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="ml-2"
                    onClick={() => removerDoCarrinho(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </ScrollArea>
          <div className="mt-4">
            <p className="text-xl font-bold">
              Total: R$ {totalCarrinho.toFixed(2)}
            </p>
            <Button className="w-full mt-4">Finalizar Compra</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
