'use client'
import { PropsWithChildren } from 'react'
import { MainSidebar } from './_components/main-sidebar'
import { useSession } from 'next-auth/react'

export default function Layout({ children }: PropsWithChildren) {
  const { data: session } = useSession()
  if (!session) {
    return <div>Você precisa estar autenticado para acessar essa página.</div>
  }

  const user = session.user

  return (
    <div className="grid grid-cols-[14rem_1fr]">
      <MainSidebar user={user} />
      <main>{children}</main>
    </div>
  )
}
