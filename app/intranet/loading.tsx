import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <Loader2 className="animate-spin text-primary mx-auto w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" />
        <p className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-gray-600">
          Carregando...
        </p>
      </div>
    </div>
  )
}
