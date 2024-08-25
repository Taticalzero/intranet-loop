import { verifyJwt } from '@/lib/jwt'
import ResetPasswordForm from '../ResetPasswordForm'

interface Props {
  params: {
    jwt: string
  }
}

const ResetPassPage = async ({ params }: Props) => {
  const payload = verifyJwt(params.jwt)
  if (!payload)
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-2xl">
        Esta URL é inválida
      </div>
    )
  return <ResetPasswordForm jwtUserId={params.jwt} />
}

export default ResetPassPage
