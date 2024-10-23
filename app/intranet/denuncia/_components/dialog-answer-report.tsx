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
import { Input } from '@/app/_components/ui/input'
import { Label } from '@/app/_components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/_components/ui/select'
import { Textarea } from '@/app/_components/ui/textarea'
import { Denuncia } from '@/types/Denuncia'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

interface DialogAnswerReportProps {
  isOpen: boolean
  onClose: () => void
  denuncia: Denuncia | null
}

const denunciaSchema = z.object({
  resposta: z
    .string({
      required_error: 'Resposta é obrigatoria',
    })
    .min(5, { message: 'Resposta deve ter pelo menos 5 caracteres' })
    .max(255, { message: 'Resposta deve ter pelo maximo 255 caracteres' }),
  status: z.enum(['pendente', 'em_analise', 'resolvida']),
})

type FormData = z.infer<typeof denunciaSchema>
export default function AnswerReportDialog({
  isOpen,
  onClose,
  denuncia,
}: DialogAnswerReportProps) {
  const handleResponderDenuncia = useCallback(
    (data: FormData) => {
      // Implementação do envio da resposta
      console.log('Dados enviados:', data)
      // Fechar o diálogo após o envio
      onClose()
    },
    [onClose]
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(denunciaSchema),
    defaultValues: {
      resposta: '',
      status: denuncia?.status || 'pendente',
    },
  })

  if (!denuncia) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Responder à Denúncia</DialogTitle>
          <DialogDescription>
            Detalhes da denúncia e formulário de resposta
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleResponderDenuncia)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="id" className="text-right">
                ID
              </Label>
              <Input
                id="id"
                value={denuncia.id}
                className="col-span-3"
                readOnly
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="titulo" className="text-right">
                Título
              </Label>
              <Input
                id="titulo"
                value={denuncia.titulo}
                className="col-span-3"
                readOnly
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="descricao" className="text-right">
                Descrição
              </Label>
              <Textarea
                id="descricao"
                value={denuncia.descricao}
                className="col-span-3"
                readOnly
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select
                onValueChange={(value) =>
                  setValue('status', value as Denuncia['status'])
                }
                defaultValue={denuncia.status}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="em_analise">Em Análise</SelectItem>
                  <SelectItem value="resolvida">Resolvida</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="resposta" className="text-right">
                Resposta
              </Label>
              <Textarea
                id="resposta"
                {...register('resposta')}
                placeholder="Digite sua resposta aqui..."
                className="col-span-3"
              />
              {errors.resposta && (
                <p className="text-red-600 col-span-3 col-start-2">
                  {errors.resposta.message}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Enviar Resposta</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
