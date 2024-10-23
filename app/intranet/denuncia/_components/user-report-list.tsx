'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/_components/ui/table'
import { Badge } from '@/app/_components/ui/badge'
import { Button } from '@/app/_components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/_components/ui/card'
import { Input } from '@/app/_components/ui/input'
import { EyeIcon, SearchIcon, PlusIcon } from 'lucide-react'
import DialogAddReport from './dialog-add-report'
import { Denuncia } from '@/types/Denuncia'
import { formatarData } from '@/utils/formatDate'
import DialogAnswerReport from './dialog-answer-report'

interface UserReportListProps {
  denuncias: Denuncia[]
}

export default function UserReportList({ denuncias }: UserReportListProps) {
  const [busca, setBusca] = useState('')
  const [openAddDenuncia, setOpenAddDenuncia] = useState(false)
  const [openAnswerDenuncia, setOpenAnswerDenuncia] = useState(false)
  const [selectedDenuncia, setSelectedDenuncia] = useState<Denuncia | null>(
    null
  )
  const [pagina, setPagina] = useState(1)
  const itensPorPagina = 5

  const denunciasFiltradas = denuncias.filter(
    (denuncia) =>
      denuncia.id.includes(busca) ||
      denuncia.descricao.toLowerCase().includes(busca.toLowerCase()) ||
      denuncia.status.toLowerCase().includes(busca.toLowerCase())
  )

  const totalPaginas = Math.ceil(denunciasFiltradas.length / itensPorPagina)
  const denunciasPaginadas = denunciasFiltradas.slice(
    (pagina - 1) * itensPorPagina,
    pagina * itensPorPagina
  )

  const handleAdicionarDenuncia = () => {
    setOpenAddDenuncia(true)
  }

  const handleAnswerDenuncia = (denuncia: Denuncia) => {
    setOpenAnswerDenuncia(true)
    setSelectedDenuncia(denuncia)
  }

  const corStatus = (status: Denuncia['status']) => {
    switch (status) {
      case 'pendente':
        return 'bg-yellow-500'
      case 'em_analise':
        return 'bg-blue-500'
      case 'resolvida':
        return 'bg-green-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Lista de Denúncias</CardTitle>
          <CardDescription>
            Gerencie e acompanhe as denúncias registradas no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between space-x-2 mb-4">
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="Buscar denúncias..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="max-w-sm"
              />
              <Button variant="outline" size="icon">
                <SearchIcon className="h-4 w-4" />
              </Button>
            </div>
            <Button onClick={handleAdicionarDenuncia}>
              <PlusIcon className="h-4 w-4 mr-2" />
              Adicionar Denúncia
            </Button>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden md:table-cell">ID</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Data de Criação
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {denunciasPaginadas.map((denuncia) => (
                  <TableRow key={denuncia.id}>
                    <TableCell className="hidden md:table-cell">
                      {denuncia.id}
                    </TableCell>
                    <TableCell>{denuncia.titulo}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {formatarData(denuncia.dataCriacao)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${corStatus(denuncia.status)} text-white`}
                      >
                        {denuncia.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAnswerDenuncia(denuncia)}
                      >
                        <EyeIcon className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-between items-center mt-4">
            <Button
              onClick={() => setPagina((p) => Math.max(1, p - 1))}
              disabled={pagina === 1}
            >
              Anterior
            </Button>
            <span>
              Página {pagina} de {totalPaginas}
            </span>
            <Button
              onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
              disabled={pagina === totalPaginas}
            >
              Próxima
            </Button>
          </div>
        </CardContent>
      </Card>
      <DialogAddReport
        isOpen={openAddDenuncia}
        onClose={() => setOpenAddDenuncia(false)}
      />
      <DialogAnswerReport
        isOpen={openAnswerDenuncia}
        onClose={() => setOpenAnswerDenuncia(false)}
        denuncia={selectedDenuncia}
      />
    </>
  )
}
