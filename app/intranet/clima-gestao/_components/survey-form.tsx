'use client'

import { Button } from '@/app/_components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/app/_components/ui/card'
import { Clock, Edit, FileText, PlusCircle, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { FormPage } from '@/types/Formulario'
import { toast } from '@/app/_components/ui/use-toast'
import { deleteSurvey } from '@/lib/actions/surveyActions'
import { Session } from 'next-auth'
import DialogForm from './dialog-form'
import DialogAnswer from './dialog-answer'
import DialogEditForm from './dialog-edit'

interface FormsProps {
  forms: FormPage[]
  user: Session['user']
}

export default function SurveyForm({ user, forms }: FormsProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [openAnswerForm, setOpenAnswerForm] = useState(false)
  const [openEditForm, setOpenEditForm] = useState(false)
  const [selectedFormulario, setSelectedFormulario] = useState<FormPage | null>(
    null
  )
  const [selectedEditForm, setSelectedEditForm] = useState<FormPage | null>(
    null
  )
  const handleDelete = async (id: number) => {
    try {
      const result = await deleteSurvey(id)
      if (result.success) {
        console.log(result.message)
        toast({
          title: 'Formulário excluído',
          description: 'Formulário excluído com sucesso',
        })
      }
    } catch (error) {
      console.error('Erro ao tentar deletar o formulário:', error)
    }
  }

  const handleEdit = (form: FormPage) => {
    setSelectedEditForm(form)
    setOpenEditForm(true)
  }

  const handleAnswer = (form: FormPage) => {
    setSelectedFormulario(form)
    setOpenAnswerForm(true)
  }

  const handleAddNew = () => {
    setIsDialogOpen(true)
  }

  return (
    <>
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Formulários</CardTitle>
          <Button onClick={handleAddNew}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Novo Formulário
          </Button>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {forms.map((form) => (
              <li
                key={form.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg"
              >
                <div className="mb-2 sm:mb-0">
                  <span className="text-lg font-medium block">
                    {form.titulo}
                  </span>
                  <span className="text-sm text-muted-foreground flex items-center">
                    <Clock className="mr-1 h-4 w-4" /> Expira em:{' '}
                    {form.dataLimite.toLocaleDateString()}
                  </span>
                </div>
                <div className="space-x-2 mt-2 sm:mt-0">
                  {user.cargo === 'Administrador' && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(form)}
                      >
                        <Edit className="mr-2 h-4 w-4" /> Editar
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(Number(form.id))}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Deletar
                      </Button>
                    </>
                  )}
                  {form.dataLimite > new Date() ? (
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleAnswer(form)}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Responder
                    </Button>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <DialogForm
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
      <DialogAnswer
        isOpen={openAnswerForm}
        onClose={() => setOpenAnswerForm(false)}
        formulario={selectedFormulario}
      />
      <DialogEditForm
        formulario={selectedEditForm}
        isOpen={openEditForm}
        onClose={() => setOpenEditForm(false)}
      />
    </>
  )
}
