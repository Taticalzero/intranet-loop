'use client'
import { Button } from '@/app/_components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/app/_components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/_components/ui/form'
import { Input } from '@/app/_components/ui/input'
import { Textarea } from '@/app/_components/ui/textarea'
import { toast } from '@/app/_components/ui/use-toast'
import { registerReport } from '@/lib/actions/reportActions'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface DialogReportProps {
  isOpen: boolean
  onClose: () => void
}

const reportSchema = z.object({
  title: z
    .string({
      required_error: 'Título é obrigatório',
    })
    .min(5, { message: 'Título deve ter pelo menos 5 caracteres' })
    .max(45, { message: 'Título deve ter pelo maximo 45 caracteres' }),

  description: z
    .string({
      required_error: 'Descrição é obrigatoria',
    })
    .min(5, { message: 'Descrição deve ter pelo menos 2 caracteres' })
    .max(255, { message: 'Descrição deve ter pelo maximo 255 caracteres' }),
})

export type ReportRegister = z.infer<typeof reportSchema>
export default function DialogAddReport({
  isOpen,
  onClose,
}: DialogReportProps) {
  const formData = useForm<ReportRegister>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  })

  const handleSubmit = async (data: ReportRegister) => {
    try {
      await registerReport(data)
      formData.reset()
      onClose()
      toast({
        description: 'Denúncia Registrada com sucesso !',
        title: 'Sucesso',
      })
    } catch (error) {
      toast({
        description: 'Algo deu errado , verifique os dados e tente novamente',
        title: 'Erro',
        variant: 'destructive',
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nova Denúncia</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para registrar uma denúncia.
          </DialogDescription>
        </DialogHeader>
        <Form {...formData}>
          <form
            onSubmit={formData.handleSubmit(handleSubmit)}
            className="grid gap-4 py-4"
          >
            <FormField
              control={formData.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titulo da Denúncia</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="grid gap-2"
                      placeholder="Informe o título da denúncia"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formData.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição da Denúncia</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva o relato de sua denúncia aqui"
                      title="Insira um nome válido"
                      className="grid gap-2 min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="submit"
                className="w-full"
                disabled={formData.formState.isSubmitting}
              >
                {formData.formState.isSubmitting
                  ? 'Aguarde...'
                  : 'Enviar Denúncia'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
