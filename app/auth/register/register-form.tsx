'use client'

import { Button } from '@/app/_components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/_components/ui/form'
import { Input } from '@/app/_components/ui/input'
import { toast } from '@/app/_components/ui/use-toast'
import { registerUser } from '@/lib/actions/authActions'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRouter } from 'next/navigation'

const registerSchema = z.object({
  email: z
    .string({
      required_error: 'Email é Obrigatório',
    })
    .email({
      message: 'Email inválido',
    })
    .refine(
      (email) => {
        const domain = email.split('@')[1]
        return domain === 'loopfibra.net' || domain === 'loopfibra.com'
      },
      {
        message: 'O email deve ser dos domínios loopfibra.net ou loopfibra.com',
      }
    ),
  password: z
    .string({
      required_error: 'Senha é Obrigatória',
    })
    .min(8, {
      message: 'Senha deve ter pelo menos 8 caracteres',
    }),
  nome: z
    .string({
      required_error: 'Nome é Obrigatório',
    })
    .min(2, 'O nome deve ter pelo menos 2 caracteres')
    .max(45, 'O nome deve ter pelo maximo 45 caracteres')
    .regex(
      new RegExp('^[a-zA-Z]+$'),
      'Caracteres Especiais não são permitidos!'
    ),
  sobrenome: z
    .string({
      required_error: 'Sobrenome é Obrigatório',
    })
    .min(2, 'O nome deve ter pelo menos 2 caracteres')
    .max(45, 'O nome deve ter pelo maximo 45 caracteres')
    .regex(
      new RegExp('^[a-zA-Z]+$'),
      'Caracteres Especiais não são permitidos!'
    ),
})

export type UserRegister = z.infer<typeof registerSchema>

export default function RegisterForm() {
  const router = useRouter()
  const formData = useForm<UserRegister>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      nome: '',
      sobrenome: '',
    },
  })

  const handleSubmit = async (data: UserRegister) => {
    try {
      await registerUser(data)
      toast({
        description: 'Conta criada com sucesso , verifique seu email',
        title: 'Sucesso',
      })
      formData.reset()
      router.push('/auth/login')
    } catch (error) {
      toast({
        description: 'Algo deu errado , verifique os dados e tente novamente',
        title: 'Erro',
        variant: 'destructive',
      })
      console.log(error)
    }
  }
  return (
    <div className="flex items-center justify-center h-screen bg-muted">
      <div className="bg-background p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-5 space-y-2">
          <h1 className="text-3xl font-bold">Cadastre-se Agora</h1>
          <p className="text-muted-foreground">Preencha o formulário abaixo</p>
        </div>
        <Form {...formData}>
          <form
            onSubmit={formData.handleSubmit(handleSubmit)}
            className="space-y-5"
          >
            <div className="flex gap-2 justify-between">
              <FormField
                control={formData.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        type="nome"
                        placeholder="Jose"
                        className="capitalize"
                        required
                        title="Insira um nome válido"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={formData.control}
                name="sobrenome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sobrenome</FormLabel>
                    <FormControl>
                      <Input
                        type="sobrenome"
                        placeholder="Jairo"
                        className="capitalize"
                        required
                        title="Insira um nome válido"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
            </div>
            <FormField
              control={formData.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@loopfibra.net"
                      required
                      pattern="^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$"
                      title="Porfavor utilize o email corporativo"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={formData.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <Button
              type="submit"
              className="w-full"
              disabled={formData.formState.isSubmitting}
            >
              {formData.formState.isSubmitting ? 'Aguarde...' : 'Cadastrar'}
            </Button>
          </form>
        </Form>
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
