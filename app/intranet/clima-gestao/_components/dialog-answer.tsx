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
import { RadioGroup, RadioGroupItem } from '@/app/_components/ui/radio-group'
import { Textarea } from '@/app/_components/ui/textarea'
import { Answer, submitAnswers } from '@/lib/actions/submitAnswers'
import { Formulario } from '@/types/Formulario'

import { useState } from 'react'

interface FormDialogProps {
  isOpen: boolean
  onClose: () => void
  formulario: Formulario | null
}

export default function FormDialog({
  isOpen,
  onClose,
  formulario,
}: FormDialogProps) {
  const [responses, setResponses] = useState<Record<string, string | string[]>>(
    {}
  )

  if (!formulario) return null
  const handleResponseChange = (
    questionId: string,
    value: string | string[]
  ) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }))
  }

  const handleSubmit = async () => {
    const answers = Object.keys(responses).map((questionId) => {
      const answer = Array.isArray(responses[questionId])
        ? (responses[questionId] as string[]).join(', ')
        : (responses[questionId] as string)

      return {
        questionId: Number(questionId),
        answer,
      }
    })

    try {
      await submitAnswers(answers)
      onClose()
    } catch (error) {
      console.error('Erro ao salvar as respostas:', error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        <DialogHeader>
          <DialogTitle>{formulario.titulo}</DialogTitle>
          <DialogDescription>
            Preencha aqui os dados do formulário
          </DialogDescription>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto">
          <div className="p-2 space-y-4">
            {formulario.questions.map((question) => (
              <div key={question.id} className="space-y-2">
                <Label
                  htmlFor={String(question.id)}
                  className="text-base font-semibold"
                >
                  {question.titulo}
                </Label>
                {question.tipo === 'paragraph' && (
                  <Textarea
                    className="w-full"
                    id={String(question.id)}
                    onChange={(e) =>
                      handleResponseChange(String(question.id), e.target.value)
                    }
                  />
                )}
                {question.tipo === 'short' && (
                  <Input
                    className="w-full"
                    id={String(question.id)}
                    onChange={(e) =>
                      handleResponseChange(String(question.id), e.target.value)
                    }
                  />
                )}
                {question.tipo === 'multiple' && (
                  <RadioGroup
                    onValueChange={(value) =>
                      handleResponseChange(String(question.id), value)
                    }
                  >
                    {question.opcoes?.map((opcao) => (
                      <div
                        key={opcao.id}
                        className="flex items-center space-x-2"
                      >
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
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Salvar Formulário
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
