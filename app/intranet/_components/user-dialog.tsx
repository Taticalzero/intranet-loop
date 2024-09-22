import { Badge } from '@/app/_components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/app/_components/ui/dialog'
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@/app/_components/ui/avatar'
import { useEffect, useState } from 'react'
import { Compras } from '@/types/Compras'
import getPurchases from '@/lib/actions/getPurchases'
import { Calendar, ShoppingBag } from 'lucide-react'
import { ScrollArea } from '@/app/_components/ui/scroll-area'
import { Separator } from '@/app/_components/ui/separator'
import EmptyList from '@/app/_components/empty-list/empty-list'
import { Usuario } from '@/types/Usuarios'

interface UserDialogProps {
  isOpen: boolean
  onClose: () => void
  user: Usuario
}

export function UserDialog({ isOpen, onClose, user }: UserDialogProps) {
  const [purchases, setPurchases] = useState<Compras[]>([])

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    return new Date(dateString).toLocaleDateString('pt-BR', options)
  }

  useEffect(() => {
    async function fetchPurchases() {
      if (user.id && isOpen) {
        const userPurchases = await getPurchases(String(user.id))
        setPurchases(userPurchases)
      }
    }

    fetchPurchases()
  }, [user.id, isOpen])
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Detalhes do Usuário</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={user.imagem as string} alt={user.nome} />
              <AvatarFallback>{user.nome.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">{user.nome}</h2>
              <p className="text-sm text-muted-foreground">
                Pontos:{' '}
                <Badge variant="default">
                  {Intl.NumberFormat('pt-BR', {
                    style: 'decimal',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(Number(user.creditos))}
                </Badge>
              </p>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              Itens Comprados
            </h3>
            <ScrollArea className="h-[200px] w-full rounded-md border p-4">
              {purchases.length === 0 ? (
                <EmptyList />
              ) : (
                <div className="space-y-4">
                  {purchases.map((item, index) => {
                    const total = item.quantidade * item.preco
                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <p className="font-medium">{item.nome}</p>
                            <Badge variant="outline">
                              Quantidade: {item.quantidade}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <Badge variant="default">
                              Pts: {total.toFixed(2)}
                            </Badge>
                          </div>
                        </div>
                        <Badge variant="outline">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(item.data)}
                        </Badge>
                        <Separator className="my-3" />
                      </div>
                    )
                  })}
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
