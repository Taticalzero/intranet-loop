'use client'

import { usePathname } from 'next/navigation'
import {
  DashboardSidebarNav,
  DashboardSidebarNavMain,
  DashboardSidebarNavLink,
} from '../dashboard/sidebar'
import { ChartCandlestick, FileChartColumn } from 'lucide-react'
import { useSession } from 'next-auth/react'

export function SidebarMenu() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  const { data: session } = useSession()

  const user = session?.user

  return (
    <aside>
      <DashboardSidebarNav>
        <DashboardSidebarNavMain>
          <DashboardSidebarNavLink
            href="/intranet/clima-gestao"
            active={isActive('/intranet/clima-gestao')}
          >
            <FileChartColumn className="w-3 h-3 mr-3" />
            Formulários
          </DashboardSidebarNavLink>
          {user?.cargo === 'Administrador' && (
            <DashboardSidebarNavLink
              href="/intranet/clima-gestao/resultados"
              active={isActive('/intranet/clima-gestao/resultados')}
            >
              <ChartCandlestick className="w-3 h-3 mr-3" />
              Resultados
            </DashboardSidebarNavLink>
          )}
        </DashboardSidebarNavMain>
      </DashboardSidebarNav>
    </aside>
  )
}
