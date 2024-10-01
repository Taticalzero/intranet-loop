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
import createSurvey from '@/lib/actions/createSurvey'
import { useSurveyStore, Question, QuestionType } from '@/store'
import { PlusCircle, Trash2 } from 'lucide-react'

interface DialogFormProps {
  isOpen: boolean
  onClose: () => void
}

export default function DialogForm({ isOpen, onClose }: DialogFormProps) {
  const {
    formTitle,
    questions,
    setFormTitle,
    addQuestion,
    updateQuestion,
    removeQuestion,
    addOption,
    updateOption,
    removeOption,
    clearQuestions,
  } = useSurveyStore()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const formData = {
      title: formTitle,
      questions: questions,
    }
    await createSurvey(formData)
    setFormTitle('')
    clearQuestions()
    onClose()
  }

  const renderQuestionEdit = (question: Question) => {
    return (
      <div key={question.id} className="bg-white shadow-sm rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4 space-x-4">
          <Input
            value={question.title}
            onChange={(e) =>
              updateQuestion(question.id, { title: e.target.value })
            }
            className="flex-grow border-0 border-b border-gray-200 rounded-none px-0 font-medium text-lg focus-visible:ring-0 focus-visible:border-gray-300"
            placeholder="Pergunta"
          />
          <Select
            value={question.type}
            onValueChange={(value) =>
              updateQuestion(question.id, { type: value as QuestionType })
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
        {question.type === 'multiple' && (
          <div className="space-y-2 mt-4">
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center">
                <Input
                  value={option}
                  onChange={(e) =>
                    updateOption(question.id, index, e.target.value)
                  }
                  className="w-full border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-gray-300"
                  placeholder={`Option ${index + 1}`}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeOption(question.id, index)}
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

  const renderQuestionPreview = (question: Question) => {
    switch (question.type) {
      case 'short':
        return <Input placeholder="Resposta Pequena" className="w-full" />
      case 'paragraph':
        return <Textarea placeholder="Resposta Grande" className="w-full" />
      case 'multiple':
        return (
          <RadioGroup>
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option}
                  id={`${question.id}-option-${index}`}
                />
                <Label htmlFor={`${question.id}-option-${index}`}>
                  {option}
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
          <DialogTitle>Crie seu Formulário</DialogTitle>
          <DialogDescription>
            Crie o seu formulário aqui. Adicione perguntas e personalize
            conforme necessário.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Criação do Formulário</h2>
              <Input
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="Título do Formulário"
                className="w-full"
              />
              {questions.map(renderQuestionEdit)}
              <Button onClick={addQuestion} className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" />
                Adiciona uma pergunta
              </Button>
            </div>
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Pré-visualização</h2>
              <div className="border p-6 rounded-md bg-white shadow-sm">
                <h3 className="text-xl font-bold mb-6">{formTitle}</h3>
                {questions.map((question) => (
                  <div key={question.id} className="mb-6">
                    <Label className="font-medium mb-2 block">
                      {question.title}
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
            Salvar Formulário
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
