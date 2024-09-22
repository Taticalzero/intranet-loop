import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from '@/app/_components/dashboard/page'
import EmptyList from '../_components/empty-list/empty-list'
import { ServerCrash } from 'lucide-react'

export default function Page() {
  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle> Intranet </DashboardPageHeaderTitle>
      </DashboardPageHeader>
      <DashboardPageMain>
        <EmptyList message="Em contrução" icon={ServerCrash} />
      </DashboardPageMain>
    </DashboardPage>
  )
}
