import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from '@/app/_components/dashboard/page'
import CardMarket from './_components/card-market'
import getProducts from '@/lib/actions/getProducts'
import { getSession } from 'next-auth/react'
import { Usuario } from '@/types/Usuarios'
import EmptyList from '@/app/_components/empty-list/empty-list'
import { FileX2 } from 'lucide-react'

export default async function Page() {
  let produtos = await getProducts()
  const session = await getSession()
  const user = session?.user
  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle> Loja </DashboardPageHeaderTitle>
      </DashboardPageHeader>
      <DashboardPageMain>
        {produtos.length === 0 ? (
          <EmptyList icon={FileX2} message="Nenhum produto encontrado" />
        ) : (
          <CardMarket produtos={produtos} user={user as Usuario} />
        )}
      </DashboardPageMain>
    </DashboardPage>
  )
}
