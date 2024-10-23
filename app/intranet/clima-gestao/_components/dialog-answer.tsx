import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
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
import { RadioGroup, RadioGroupItem } from '@/app/_components/ui/radio-group'
import { Textarea } from '@/app/_components/ui/textarea'
import { submitAnswers } from '@/lib/actions/surveyActions'
import { FormPage, QuestaoPage } from '@/types/Formulario'
import { toast } from '@/app/_components/ui/use-toast'

interface FormDialogProps {
  isOpen: boolean
  onClose: () => void
  formulario: FormPage | null
}

function FormContent({
  formulario,
  onClose,
}: {
  formulario: FormPage
  onClose: () => void
}) {
  const createValidationSchema = (questions: QuestaoPage[]) => {
    const schemaFields: Record<string, z.ZodTypeAny> = {}
    questions.forEach((question) => {
      schemaFields[`question_${question.id}`] = z
        .string()
        .min(1, { message: 'Este campo é obrigatório' })
    })
    return z.object(schemaFields)
  }

  const validationSchema = createValidationSchema(formulario.questions)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
  })

  const onSubmit = async (data: Record<string, string>) => {
    const answers = Object.entries(data).map(([key, value]) => ({
      questionId: Number(key.split('_')[1]),
      answer: value,
    }))
    try {
      const response = await submitAnswers(answers, formulario.id)
      if (response?.error) {
        toast({
          title: 'Erro',
          description: response.error,
          variant: 'destructive',
        })
        onClose()
      } else {
        toast({
          title: 'Sucesso',
          description: response?.success,
        })
        onClose()
      }
    } catch (error) {
      console.error('Erro ao salvar as respostas:', error)
      toast({
        title: 'Erro',
        description: 'Erro ao salvar as respostas, tente novamente mais tarde.',
        variant: 'destructive',
      })
    }
  }

  const renderQuestion = (question: QuestaoPage) => {
    const fieldName = `question_${question.id}`

    switch (question.tipo) {
      case 'paragraph':
        return (
          <Controller
            name={fieldName}
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                className="w-full"
                id={String(question.id)}
              />
            )}
          />
        )
      case 'short':
        return (
          <Controller
            name={fieldName}
            control={control}
            render={({ field }) => (
              <Input {...field} className="w-full" id={String(question.id)} />
            )}
          />
        )
      case 'multiple':
        return (
          <Controller
            name={fieldName}
            control={control}
            render={({ field }) => (
              <RadioGroup onValueChange={field.onChange} value={field.value}>
                {question.opcoes?.map((opcao) => (
                  <div key={opcao.id} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={opcao.valor}
                      id={`${question.id}-${opcao.id}`}
                    />
                    <Label htmlFor={`${question.id}-${opcao.id}`}>
                      {opcao.valor}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          />
        )
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-grow overflow-y-auto"
    >
      <div className="p-2 space-y-4">
        {formulario.questions.map((question) => (
          <div key={question.id} className="space-y-2">
            <Label
              htmlFor={String(question.id)}
              className="text-base font-semibold"
            >
              {question.titulo}
            </Label>
            {renderQuestion(question)}
            {errors[`question_${question.id}`] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[`question_${question.id}`]?.message as string}
              </p>
            )}
          </div>
        ))}
      </div>
      <DialogFooter>
        <Button type="submit">Salvar Formulário</Button>
      </DialogFooter>
    </form>
  )
}

export default function AnswerDialog({
  isOpen,
  onClose,
  formulario,
}: FormDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        <DialogHeader>
          <DialogTitle>{formulario?.titulo}</DialogTitle>
          <DialogDescription>
            Preencha aqui os dados do formulário
          </DialogDescription>
        </DialogHeader>
        {formulario && (
          <FormContent formulario={formulario} onClose={onClose} />
        )}
      </DialogContent>
    </Dialog>
  )
}
