import { EdgeStoreProvider } from '@/lib/edgestore'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cdn de Imagens',
  description: '🗃️ CDN TDD - Ong Violeta Eliz'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt" className="bg-black">
      <body className={inter.className}>
        <EdgeStoreProvider>{children}</EdgeStoreProvider>
      </body>
    </html>
  )
}
