import { createUser } from '@/actions/users'
import { Button } from '@/app/_components/ui/button'
import { Input } from '@/app/_components/ui/input'
import { Label } from '@/app/_components/ui/label'
import Link from 'next/link'

export default function RegisterForm() {
  return (
    <div className="flex items-center justify-center h-screen bg-muted">
      <div className="bg-background p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-5 space-y-2">
          <h1 className="text-3xl font-bold">Cadastre-se Agora</h1>
          <p className="text-muted-foreground">Preencha o formulário abaixo</p>
        </div>
        <form action={createUser} className="space-y-5">
          <div className="grid gap-1">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              name="nome"
              placeholder="Jose Jairo"
              required
              pattern="^[a-zA-Zs]+$"
              title="Please enter a valid name"
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="m@loopfibra.net"
              required
              pattern="^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$"
              title="Porfavor utilize o email corporativo"
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              name="senha"
              required
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$"
              title="A senha deve ter pelo menos 8 caracteres e conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um carácter especial"
            />
          </div>
          <Button type="submit" className="w-full">
            Inscrever-se
          </Button>
        </form>
        <div className="text-center mt-4 text-sm text-muted-foreground">
          Já tem uma Conta?{' '}
          <Link
            href="/auth/login"
            className="text-primary hover:underline"
            prefetch={false}
          >
            Faça seu Login !
          </Link>
        </div>
      </div>
    </div>
  )
}
