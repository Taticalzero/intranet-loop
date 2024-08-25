import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { PropsWithChildren } from 'react'
import { MainSidebar } from './_components/main-sidebar'

export default async function Layout({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions)
  const user = session?.user

  return (
    <div className="grid grid-cols-[14rem_1fr]">
      <MainSidebar user={user} />
      <main>{children}</main>
    </div>
  )
}
