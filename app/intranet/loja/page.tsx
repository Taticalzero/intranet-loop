import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderTitle,
  DashboardPageHeaderNav,
  DashboardPageMain,
} from '@/app/_components/dashboard/page'
import CardMarket from './_components/card-market-loja'

export default function Page() {
  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle> Loja </DashboardPageHeaderTitle>
      </DashboardPageHeader>
      <DashboardPageMain>
        <CardMarket />
      </DashboardPageMain>
    </DashboardPage>
  )
}
