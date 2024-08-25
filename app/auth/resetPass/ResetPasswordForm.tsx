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
import { resetPassword } from '@/lib/actions/authActions'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRouter } from 'next/navigation'

const resetPassSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Senha deve ter no mínimo 8 caracteres!')
      .max(52, 'Senha deve ter no máximo 52 caracteres!'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não conferem!',
    path: ['confirmPassword'],
  })

type resetInputPass = z.infer<typeof resetPassSchema>

interface Props {
  jwtUserId: string
}

export default function ResetPasswordForm({ jwtUserId }: Props) {
  const router = useRouter()
  const formData = useForm<resetInputPass>({
    resolver: zodResolver(resetPassSchema),
    defaultValues: {
      confirmPassword: '',
      password: '',
    },
  })

  const handleSubmit = async (data: resetInputPass) => {
    try {
      const result = await resetPassword(jwtUserId, data.password)
      if (result === 'success')
        toast({
          description: 'Senha redefinida com sucesso',
          title: 'Sucesso',
        })
      formData.reset()

      router.push('/auth/login')
    } catch (error) {
      toast({
        description: 'Algo deu errado , verifique os dados e tente novamente',
        title: 'Erro',
      })
      console.log(error)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-muted">
      <div className="bg-background p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-5 space-y-2">
          <h1 className="text-3xl font-bold">Redefina sua senha</h1>
          <p className="text-muted-foreground">Preencha o formulário abaixo</p>
        </div>
        <Form {...formData}>
          <form
            onSubmit={formData.handleSubmit(handleSubmit)}
            className="space-y-5"
          >
            <FormField
              control={formData.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nova Senha</FormLabel>
                  <FormControl>
                    <Input type="password" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={formData.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirme Nova Senha</FormLabel>
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
              {formData.formState.isSubmitting
                ? 'Aguarde...'
                : 'Redefinir Senha'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
