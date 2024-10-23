import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from '@/app/_components/dashboard/page'
import EmptyList from '@/app/_components/empty-list/empty-list'
import UserReportList from './_components/user-report-list'
import { getAllReports, getReportsUser } from '@/lib/actions/reportActions'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function Page() {
  const session = await getServerSession(authOptions)
  let denuncias = []
  if (session?.user.cargo === 'Administrador') {
    denuncias = await getAllReports()
  } else {
    denuncias = await getReportsUser()
  }

  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle> Canal de Denúncia </DashboardPageHeaderTitle>
      </DashboardPageHeader>
      <DashboardPageMain>
        {denuncias.length === 0 ? (
          <EmptyList message="Nenhuma denúncia encontrada" />
        ) : (
          <UserReportList denuncias={denuncias} />
        )}
      </DashboardPageMain>
    </DashboardPage>
  )
}
