import type { Metadata } from 'next'

import React from 'react'
import { Instrument_Sans, Inter, Italiana } from 'next/font/google'
import { cn } from '@/utilities/ui'
import { AdminBar } from '@/components/AdminBar'
import { draftMode } from 'next/headers'
import { Footer } from '@/globals/Footer/Component'
import { Header } from '@/globals/Header/Component'

import './styles.css'
import { Providers } from '@/providers'

export const metadata: Metadata = {
  description: 'A luxury hook and storage company for businesses and individuals.',
  title: "Ella'Fe | Elevating every detail",
}

const italiana = Italiana({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-italiana',
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: '500',
  display: 'swap',
  variable: '--font-instrument',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html
      className={cn(italiana.variable, inter.variable, instrumentSans.variable)}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
