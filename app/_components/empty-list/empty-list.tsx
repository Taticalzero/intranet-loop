import { Box, LucideIcon } from 'lucide-react'

interface EmptyListProps {
  message?: string
  icon?: LucideIcon
}
export default function EmptyList({
  message = 'Nada encontrado',
  icon: Icon = Box,
}: EmptyListProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-muted/40 rounded-lg border-2 border-dashed border-muted">
      <Icon
        className="w-12 h-12 text-muted-foreground mb-4"
        aria-hidden="true"
      />
      <h2 className="text-lg font-semibold text-foreground mb-2">{message}</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Parece que não há nada aqui.
      </p>
    </div>
  )
}
