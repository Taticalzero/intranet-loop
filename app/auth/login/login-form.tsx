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
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface Props {
  callbackUrl?: string
}

const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email é Obrigatório',
    })
    .email({
      message: 'Email inválido',
    }),
  password: z
    .string({
      required_error: 'Senha é Obrigatória',
    })
    .min(8, {
      message: 'Senha deve ter pelo menos 8 caracteres',
    }),
})

type UserForm = z.infer<typeof loginSchema>

export default function LoginForm(props: Props) {
  const router = useRouter()
  const formData = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleSubmit = async (data: UserForm) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      })
      if (!result?.ok) {
        toast({
          variant: 'destructive',
          title: 'Crendeciais incorretas',
          description: `${result?.error}`,
        })
        return
      }
      toast({
        title: 'Login realizado com sucesso',
        description: 'Seja Bem vindo(a) !',
      })
      router.push(props.callbackUrl ? props.callbackUrl : '/intranet')
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Crendeciais incorretas',
        description: `${error}`,
      })
      return
    }
  }
  return (
    <div className="flex items-center justify-center h-screen bg-muted">
      <div className="bg-background p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-5 space-y-2">
          <h1 className="text-3xl font-bold">Intranet Loop</h1>
          <p className="text-muted-foreground">Faça o Login</p>
        </div>
        <Form {...formData}>
          <form
            onSubmit={formData.handleSubmit(handleSubmit)}
            className="space-y-5"
          >
            <FormField
              control={formData.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Preencha com seu email"
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
                  <div className="flex items-center justify-between">
                    <FormLabel>Senha</FormLabel>
                    <Link
                      href="/auth/password-reset"
                      className="text-primary hover:underline text-sm"
                      prefetch={false}
                    >
                      Esqueceu a senha ?
                    </Link>
                  </div>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Preencha com sua senha"
                    />
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
              {formData.formState.isSubmitting ? 'Aguarde...' : 'Entrar'}
            </Button>
          </form>
        </Form>
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
