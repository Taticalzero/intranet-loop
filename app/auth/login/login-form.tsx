import { loginUser } from '@/actions/users'
import { Button } from '@/app/_components/ui/button'
import { Input } from '@/app/_components/ui/input'
import { Label } from '@/app/_components/ui/label'
import Link from 'next/link'

export default function LoginForm() {
  return (
    <div className="flex items-center justify-center h-screen bg-muted">
      <div className="bg-background p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-5 space-y-2">
          <h1 className="text-3xl font-bold">Intranet Loop</h1>
          <p className="text-muted-foreground">Faça o Login</p>
        </div>
        <form action={loginUser} className="space-y-5">
          <div className="grid gap-1">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              id="email"
              type="email"
              placeholder="Preencha com seu email"
              className="w-full"
            />
          </div>
          <div className="grid gap-1">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Senha</Label>
              <Link
                href="/auth/password-reset"
                className="text-primary hover:underline text-sm"
                prefetch={false}
              >
                Esqueceu a senha ?
              </Link>
            </div>
            <Input
              name="password"
              id="password"
              type="password"
              placeholder="Preencha com sua senha"
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full">
            Entrar
          </Button>
        </form>
        <div className="text-center mt-4 text-sm text-muted-foreground">
          Não tem uma Conta?{' '}
          <Link
            href="/auth/register"
            className="text-primary hover:underline"
            prefetch={false}
          >
            Crie uma agora !
          </Link>
        </div>
      </div>
    </div>
  )
}
