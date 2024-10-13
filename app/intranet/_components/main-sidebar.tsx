'use client'

import { usePathname } from 'next/navigation'

import { Session } from 'next-auth'
import {
  DashboardSidebar,
  DashboardSidebarHeader,
  DashboardSidebarMain,
  DashboardSidebarNav,
  DashboardSidebarNavMain,
  DashboardSidebarNavLink,
  DashboardSidebarNavHeader,
  DashboardSidebarNavHeaderTitle,
  DashboardSidebarFooter,
} from '@/app/_components/dashboard/sidebar'
import { Logo } from '@/app/_components/logo/logo'
import {
  AlertTriangleIcon,
  ChartPieIcon,
  HomeIcon,
  ShoppingCartIcon,
  WalletIcon,
} from 'lucide-react'
import { UserDropdown } from './user-dropdown'

type MainSidebarProps = {
  user: Session['user']
}

export function MainSidebar({ user }: MainSidebarProps) {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <DashboardSidebar>
      <DashboardSidebarHeader>
        <div className="flex justify-between items-center gap-2">
          <Logo />
          <p className="text-xl font-semibold">Intranet Loop</p>
        </div>
      </DashboardSidebarHeader>
      <DashboardSidebarMain className="flex flex-col flex-grow">
        <DashboardSidebarNav>
          <DashboardSidebarNavMain>
            <DashboardSidebarNavLink
              href="/intranet"
              active={isActive('/intranet')}
            >
              <HomeIcon className="w-3 h-3 mr-3" />
              Inicio
            </DashboardSidebarNavLink>
            <DashboardSidebarNavLink
              href="/intranet/contra-cheques"
              active={isActive('/intranet/contra-cheques')}
            >
              <WalletIcon className="w-3 h-3 mr-3" />
              Contra-cheques
            </DashboardSidebarNavLink>
            <DashboardSidebarNavLink
              href="/intranet/loja"
              active={isActive('/intranet/loja')}
            >
              <ShoppingCartIcon className="w-3 h-3 mr-3" />
              Loja
            </DashboardSidebarNavLink>
            <DashboardSidebarNavLink
              href="/intranet/clima-gestao"
              active={isActive('/intranet/clima-gestao')}
            >
              <ChartPieIcon className="w-3 h-3 mr-3" />
              Clima e Gestão
            </DashboardSidebarNavLink>
            <DashboardSidebarNavLink
              href="/intranet/denuncia"
              active={isActive('/intranet/denuncia')}
            >
              <AlertTriangleIcon className="w-3 h-3 mr-3" />
              Denúncia
            </DashboardSidebarNavLink>
          </DashboardSidebarNavMain>
        </DashboardSidebarNav>

        <DashboardSidebarNav className="mt-auto">
          <DashboardSidebarNavHeader>
            <DashboardSidebarNavHeaderTitle>
              Links extras
            </DashboardSidebarNavHeaderTitle>
          </DashboardSidebarNavHeader>
          <DashboardSidebarNavMain>
            <DashboardSidebarNavLink href="https://www.loopfibra.net.br/site/">
              Site Institucional
            </DashboardSidebarNavLink>
            <DashboardSidebarNavLink href="https://academy.loopfibra.com/">
              Loop Academy
            </DashboardSidebarNavLink>
            <DashboardSidebarNavLink href="/intranet/faq">
              FAQs
            </DashboardSidebarNavLink>
            <DashboardSidebarNavLink href="/intranet/politica-privacidade">
              Política de Privacidade
            </DashboardSidebarNavLink>
            <DashboardSidebarNavLink href="/intranet/termo-servico">
              Termo de Serviço
            </DashboardSidebarNavLink>
          </DashboardSidebarNavMain>
        </DashboardSidebarNav>
      </DashboardSidebarMain>
      <DashboardSidebarFooter>
        <UserDropdown user={user} />
      </DashboardSidebarFooter>
    </DashboardSidebar>
  )
}
