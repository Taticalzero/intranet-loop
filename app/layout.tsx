import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { Toaster } from './_components/ui/toaster'
import { NextAuthProvider } from './providers'
import Hydrate from './_components/hydrate/hydrate'

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Intranet - Loop',
  description: 'Loop Fibra 2024',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body className={poppins.className}>
        <Hydrate>
          <NextAuthProvider>
            {children}
            <Toaster />
          </NextAuthProvider>
        </Hydrate>
      </body>
    </html>
  )
}
