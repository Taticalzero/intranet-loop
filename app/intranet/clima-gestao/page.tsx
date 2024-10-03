import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from '@/app/_components/dashboard/page'
import SurveyForm from './_components/survey-form'
import { getServerSession } from 'next-auth'
import { Usuario } from '@/types/Usuarios'
import { getSurveysForms } from '@/lib/actions/surveyActions'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function Page() {
  const forms = await getSurveysForms()
  const session = await getServerSession(authOptions)
  const user = session?.user
  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle> Clima e Gestão </DashboardPageHeaderTitle>
      </DashboardPageHeader>
      <DashboardPageMain>
        <SurveyForm user={user as Usuario} forms={forms} />
      </DashboardPageMain>
    </DashboardPage>
  )
}
