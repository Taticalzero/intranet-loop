import { Usuario } from '@/types/Usuarios'
import SurveyForm from '../_components/survey-form'
import { getSurveysForms } from '@/lib/actions/surveyActions'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function Page() {
  const forms = await getSurveysForms()
  const session = await getServerSession(authOptions)
  const user = session?.user

  return <SurveyForm user={user as Usuario} forms={forms} />
}
