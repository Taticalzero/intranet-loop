'use client'

import { Button } from '@/app/_components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/app/_components/ui/card'
import { FilePenIcon, TrashIcon, PlusIcon } from 'lucide-react'
import { useState } from 'react'
import DialogForm from './dialog-form'

export default function CardForm() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-8 pt-12 md:pt-0 md:flex-row">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Formulário - Clima e Gestão 2024 </CardTitle>
            <CardDescription>
              Este formulário avalia o clima e gestão da empresa LoopFibra{' '}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center space-x-10 justify-between">
            <div>
              <p className="text-muted-foreground">Expira em </p>
              <p className="text-2xl font-bold">30/09/2024</p>
            </div>
            <div className="flex-row space-y-2">
              <Button variant="default">
                <PlusIcon className="mr-2 h-5 w-5" />
                Abrir Formulário
              </Button>
              <div className="flex flex-row justify-between items-center gap-2">
                <Button variant="outline">
                  <FilePenIcon className="mr-2 h-5 w-5" />
                  Edit
                </Button>
                <Button variant="destructive">
                  <TrashIcon className="mr-2 h-5 w-5" />
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Novo Formulário</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setIsDialogOpen(true)}>
              <PlusIcon className="mr-2 h-5 w-5" />
              Adicionar Novo Formulário
            </Button>
          </CardContent>
        </Card>
      </div>
      <DialogForm
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  )
}
