import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from '@/app/_components/dashboard/page'
import { SidebarMenu } from '@/app/_components/sidebar-menu/sidebar-menu'
import { PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Clima e Gestão</DashboardPageHeaderTitle>
      </DashboardPageHeader>
      <DashboardPageMain>
        <div className="max-w-screen-lg">
          <div className="grid grid-cols-[10rem_1fr] gap-10">
            <SidebarMenu />
            <div>{children}</div>
          </div>
        </div>
      </DashboardPageMain>
    </DashboardPage>
  )
}
