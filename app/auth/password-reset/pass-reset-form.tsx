'use client'

import { Button } from '@/app/_components/ui/button'
import { Input } from '@/app/_components/ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@/app/_components/ui/use-toast'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/app/_components/ui/form'
import { forgotPassword } from '@/lib/actions/authActions'

const RecoveryUserPassword = z.object({
  email: z
    .string({
      required_error: 'Email é Obrigatório',
    })
    .email({
      message: 'Email inválido',
    }),
})

export type UserPassWordType = z.infer<typeof RecoveryUserPassword>

export default function PasswordRecovery() {
  const formData = useForm<UserPassWordType>({
    resolver: zodResolver(RecoveryUserPassword),
    defaultValues: {
      email: '',
    },
  })

  const handleSubmit = async (data: UserPassWordType) => {
    try {
      const result = await forgotPassword(data.email)
      if (result)
        toast({
          title: 'Email enviado com sucesso',
          description: 'Verifique sua caixa de entrada !',
        })
      formData.reset()
    } catch (error) {
      toast({
        title: 'Crendeciais incorretas',
        description: 'Favor verifique suas credenciais !',
      })
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-muted">
      <div className="bg-background p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-5 space-y-2">
          <h1 className="text-3xl font-bold">Esqueceu sua senha ?</h1>
          <p className="text-muted-foreground">
            Preencha com seu e-mail corporativo abaixo e enviaremos um link para
            redefinir sua senha.
          </p>
        </div>
        <Form {...formData}>
          <form
            onSubmit={formData.handleSubmit(handleSubmit)}
            className="mt-6 space-y-4"
          >
            <FormField
              control={formData.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@loopfibra.net"
                      required
                      pattern="^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$"
                      {...field}
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
              {formData.formState.isSubmitting
                ? 'Enviando email...'
                : 'Resetar Senha'}
            </Button>
          </form>
        </Form>
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
