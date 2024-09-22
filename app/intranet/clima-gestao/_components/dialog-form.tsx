'use client'
import { Button } from '@/app/_components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/_components/ui/dialog'
import { Input } from '@/app/_components/ui/input'
import { Label } from '@/app/_components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/app/_components/ui/radio-group'
import { ScrollArea } from '@/app/_components/ui/scroll-area'
import { Textarea } from '@/app/_components/ui/textarea'
import { PlusCircle, Trash2 } from 'lucide-react'
import { useState } from 'react'

interface DialogFormProps {
  isOpen: boolean
  onClose: () => void
}

type QuestionType = 'short' | 'paragraph' | 'multiple'

interface Question {
  id: string
  type: QuestionType
  title: string
  options?: string[]
}

export default function DialogForm({ isOpen, onClose }: DialogFormProps) {
  const [formTitle, setFormTitle] = useState('Untitled Form')
  const [questions, setQuestions] = useState<Question[]>([])

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      type: 'short',
      title: 'Untitled Question',
      options: ['Option 1'],
    }
    setQuestions([...questions, newQuestion])
  }

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, ...updates } : q)))
  }

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id))
  }

  const addOption = (questionId: string) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId) {
          return {
            ...q,
            options: [
              ...(q.options || []),
              `Option ${(q.options?.length || 0) + 1}`,
            ],
          }
        }
        return q
      })
    )
  }

  const updateOption = (
    questionId: string,
    optionIndex: number,
    value: string
  ) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId && q.options) {
          const newOptions = [...q.options]
          newOptions[optionIndex] = value
          return { ...q, options: newOptions }
        }
        return q
      })
    )
  }

  const removeOption = (questionId: string, optionIndex: number) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId && q.options) {
          return {
            ...q,
            options: q.options.filter((_, index) => index !== optionIndex),
          }
        }
        return q
      })
    )
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log('Form submitted:', { formTitle, questions })
    onClose()
  }

  const renderQuestionEdit = (question: Question) => {
    return (
      <div key={question.id} className="bg-white shadow-sm rounded-lg p-6 mb-6">
        <div className="flex justify-between mb-4">
          <Input
            value={question.title}
            onChange={(e) =>
              updateQuestion(question.id, { title: e.target.value })
            }
            className="w-3/4 border-0 border-b border-gray-200 rounded-none px-0 font-medium text-lg focus-visible:ring-0 focus-visible:border-gray-300"
            placeholder="Question"
          />
          <select
            value={question.type}
            onChange={(e) =>
              updateQuestion(question.id, {
                type: e.target.value as QuestionType,
              })
            }
            className="border rounded p-2 text-sm"
          >
            <option value="short">Short answer</option>
            <option value="paragraph">Paragraph</option>
            <option value="multiple">Multiple choice</option>
          </select>
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
              Add Option
            </Button>
          </div>
        )}
        <Button
          variant="destructive"
          size="sm"
          onClick={() => removeQuestion(question.id)}
          className="mt-4"
        >
          Remove Question
        </Button>
      </div>
    )
  }

  const renderQuestionPreview = (question: Question) => {
    switch (question.type) {
      case 'short':
        return <Input placeholder="Short answer text" className="w-full" />
      case 'paragraph':
        return <Textarea placeholder="Long answer text" className="w-full" />
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
              <h2 className="text-lg font-semibold">Edição do formulário</h2>
              <Input
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="Form Title"
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
