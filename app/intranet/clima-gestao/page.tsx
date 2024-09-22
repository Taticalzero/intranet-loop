import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from '@/app/_components/dashboard/page'
import CardForm from './_components/card-form'

export default function Page() {
  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle> Clima e Gestão </DashboardPageHeaderTitle>
      </DashboardPageHeader>
      <DashboardPageMain>
        <CardForm />
      </DashboardPageMain>
    </DashboardPage>
  )
}
