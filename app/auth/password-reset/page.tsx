import { recoveryPassword } from '@/actions/users'
import { Button } from '@/app/_components/ui/button'
import { Input } from '@/app/_components/ui/input'
import { Label } from '@/app/_components/ui/label'

import Link from 'next/link'

export default function PasswordRecovery() {
  return (
    <div className="flex items-center justify-center h-screen bg-muted">
      <div className="bg-background p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-5 space-y-2">
          <h1 className="text-3xl font-bold">Esqueceu sua senha ?</h1>
          <p className="text-muted-foreground">
            Preencha com seu email corporativo abaixo que iremos reseta-la no
            padrão LoopFibra
          </p>
        </div>
        <form action={recoveryPassword} className="mt-6 space-y-4">
          <div>
            <Label htmlFor="email" className="sr-only">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Preencha com seu email"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Resetar Senha
          </Button>
        </form>
        <div className="text-center mt-4 text-sm text-muted-foreground">
          <Link
            href="/auth/login"
            className="text-primary hover:underline"
            prefetch={false}
          >
            Voltar para o Login
          </Link>
        </div>
      </div>
    </div>
  )
}
