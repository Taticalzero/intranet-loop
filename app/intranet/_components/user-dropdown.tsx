'use client'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/app/_components/ui/avatar'
import { Button } from '@/app/_components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/_components/ui/dropdown-menu'
import { GraduationCapIcon, LogOutIcon, SettingsIcon } from 'lucide-react'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import { UserDialog } from './user-dialog'
import { useState } from 'react'

type UserDropdownProps = {
  user: Session['user']
}

export function UserDropdown({ user }: UserDropdownProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  if (!user) return

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="link"
            className="relative h-8 flex items-center justify-between w-full space-x-2 !px-0"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage
                className="rounded-full"
                src={user.imagem as string}
                alt={user.nome}
              />
              <AvatarFallback>{user.nome.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col flex-1 space-y-1 text-left">
              {user.nome && (
                <p className="text-xs font-medium leading-none">{user.nome}</p>
              )}
              <p className="text-xs leading-none text-muted-foreground">
                {user.cargo}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                Pontos:{' '}
                {Intl.NumberFormat('pt-BR', {
                  style: 'decimal',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(Number(user.creditos))}
              </p>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.nome}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <GraduationCapIcon className="w-3 h-3 mr-3" />
              Loop Academy
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
              <SettingsIcon className="w-3 h-3 mr-3" />
              Configurações
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOutIcon className="w-3 h-3 mr-3" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UserDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        user={user}
      />
    </>
  )
}
