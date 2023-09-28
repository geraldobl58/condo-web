import type { Metadata } from 'next'

import { ClerkProvider } from '@clerk/nextjs'

import { Inter } from 'next/font/google'

import { ptBR } from "@clerk/localizations";

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Condo Web',
  description: 'Condo Web',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="en">
        <body className={inter.className}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
