import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from '@/app/_components/dashboard/page'
import EmptyList from '@/app/_components/empty-list/empty-list'
import UserReportList from './_components/user-report-list'

export default function Page() {
  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle> Canal de Denúncia </DashboardPageHeaderTitle>
      </DashboardPageHeader>
      <DashboardPageMain>
        <UserReportList />
      </DashboardPageMain>
    </DashboardPage>
  )
}
