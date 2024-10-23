import { activateUser } from '@/lib/actions/authActions'
import { redirect } from 'next/navigation'
interface Props {
  params: {
    jwt: string
  }
}

const ActivationPage = async ({ params }: Props) => {
  const result = await activateUser(params.jwt)
  if (result === 'success') {
    redirect('/auth/login')
  }
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      {result === 'userNotExist' ? (
        <p className="text-red-500 text-2xl">
          Este usuário não existe no sistema
        </p>
      ) : result === 'alreadyActivated' ? (
        <p className="text-red-500 text-2xl">Este usuário já foi ativado</p>
      ) : result === 'success' ? (
        <p className="text-green-500 text-2xl">
          Sucesso! O seu usuário foi ativado
        </p>
      ) : (
        <p className="text-yellow-500 text-2xl">Opa! Algo deu errado!</p>
      )}
    </div>
  )
}

export default ActivationPage
