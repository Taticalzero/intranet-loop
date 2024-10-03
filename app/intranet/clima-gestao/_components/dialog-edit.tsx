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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/_components/ui/select'
import { Textarea } from '@/app/_components/ui/textarea'
import { updateSurvey } from '@/lib/actions/surveyActions'
import { FormPage, QuestaoPage, QuestionType } from '@/types/Formulario'
import { PlusCircle, Trash2 } from 'lucide-react'
import { useState, useEffect } from 'react'

interface DialogFormProps {
  isOpen: boolean
  onClose: () => void
  formulario: FormPage | null
}

export default function DialogEditForm({
  isOpen,
  onClose,
  formulario,
}: DialogFormProps) {
  const [localFormTitle, setLocalFormTitle] = useState('')
  const [localQuestions, setLocalQuestions] = useState<QuestaoPage[]>([])

  useEffect(() => {
    if (formulario) {
      setLocalFormTitle(formulario.titulo)
      setLocalQuestions(formulario.questions)
    }
  }, [formulario])

  if (!formulario) return null

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const formData = {
      id: formulario.id,
      title: localFormTitle,
      questions: localQuestions,
    }
    await updateSurvey(formData.id, formData.title, formData.questions)
    onClose()
  }

  const addQuestion = () => {
    const newQuestion: QuestaoPage = {
      id: Date.now(),
      formularioId: formulario.id,
      tipo: 'short',
      titulo: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      opcoes: [],
    }
    setLocalQuestions([...localQuestions, newQuestion])
  }

  const updateQuestion = (id: number, updates: Partial<QuestaoPage>) => {
    setLocalQuestions(
      localQuestions.map((q) =>
        q.id === id ? { ...q, ...updates, updatedAt: new Date() } : q
      )
    )
  }

  const removeQuestion = (id: number) => {
    setLocalQuestions(localQuestions.filter((q) => q.id !== id))
  }

  const addOption = (questionId: number) => {
    setLocalQuestions(
      localQuestions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              opcoes: [
                ...(q.opcoes || []),
                { id: Date.now(), valor: '', questaoId: questionId },
              ],
            }
          : q
      )
    )
  }

  const updateOption = (
    questionId: number,
    optionId: number,
    value: string
  ) => {
    setLocalQuestions(
      localQuestions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              opcoes: q.opcoes?.map((opt) =>
                opt.id === optionId ? { ...opt, valor: value } : opt
              ),
            }
          : q
      )
    )
  }

  const removeOption = (questionId: number, optionId: number) => {
    setLocalQuestions(
      localQuestions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              opcoes: q.opcoes?.filter((opt) => opt.id !== optionId),
            }
          : q
      )
    )
  }

  const renderQuestionEdit = (question: QuestaoPage) => {
    return (
      <div key={question.id} className="bg-white shadow-sm rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4 space-x-4">
          <Input
            value={question.titulo}
            onChange={(e) =>
              updateQuestion(question.id, { titulo: e.target.value })
            }
            className="flex-grow border-0 border-b border-gray-200 rounded-none px-0 font-medium text-lg focus-visible:ring-0 focus-visible:border-gray-300"
            placeholder="Pergunta"
          />
          <Select
            value={question.tipo}
            onValueChange={(value) =>
              updateQuestion(question.id, { tipo: value as QuestionType })
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tipo de Pergunta" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="short">Resposta Pequena</SelectItem>
              <SelectItem value="paragraph">Parágrafo</SelectItem>
              <SelectItem value="multiple">Multipla Escolha</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {question.tipo === 'multiple' && (
          <div className="space-y-2 mt-4">
            {question.opcoes?.map((option) => (
              <div key={option.id} className="flex items-center">
                <Input
                  value={option.valor}
                  onChange={(e) =>
                    updateOption(question.id, option.id, e.target.value)
                  }
                  className="w-full border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-gray-300"
                  placeholder={`Option ${option.id}`}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeOption(question.id, option.id)}
                  className="ml-2"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => addOption(question.id)}
              className="mt-2"
            >
              Adicionar Opção
            </Button>
          </div>
        )}
        <Button
          variant="destructive"
          size="sm"
          onClick={() => removeQuestion(question.id)}
          className="mt-4"
        >
          Remover Questão
        </Button>
      </div>
    )
  }

  const renderQuestionPreview = (question: QuestaoPage) => {
    switch (question.tipo) {
      case 'short':
        return <Input placeholder="Resposta Pequena" className="w-full" />
      case 'paragraph':
        return <Textarea placeholder="Resposta Grande" className="w-full" />
      case 'multiple':
        return (
          <RadioGroup>
            {question.opcoes?.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.valor}
                  id={`${question.id}-option-${option.id}`}
                />
                <Label htmlFor={`${question.id}-option-${option.id}`}>
                  {option.valor}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        <DialogHeader>
          <DialogTitle>Editar Formulário</DialogTitle>
          <DialogDescription>
            Edite seu formulário aqui. Modifique perguntas e personalize
            conforme necessário.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Edição do Formulário</h2>
              <Input
                value={localFormTitle}
                onChange={(e) => setLocalFormTitle(e.target.value)}
                placeholder="Título do Formulário"
                className="w-full"
              />
              {localQuestions.map(renderQuestionEdit)}
              <Button onClick={addQuestion} className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" />
                Adiciona uma pergunta
              </Button>
            </div>
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Pré-visualização</h2>
              <div className="border p-6 rounded-md bg-white shadow-sm">
                <h3 className="text-xl font-bold mb-6">{localFormTitle}</h3>
                {localQuestions.map((question) => (
                  <div key={question.id} className="mb-6">
                    <Label className="font-medium mb-2 block">
                      {question.titulo}
                    </Label>
                    {renderQuestionPreview(question)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Salvar Alterações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
