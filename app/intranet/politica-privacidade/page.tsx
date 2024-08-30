import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderTitle,
  DashboardPageHeaderNav,
} from '@/app/_components/dashboard/page'

export default function Page() {
  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>
          {' '}
          Politica de Privacidade{' '}
        </DashboardPageHeaderTitle>
      </DashboardPageHeader>
    </DashboardPage>
  )
}
