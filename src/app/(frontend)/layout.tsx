import type { Metadata } from 'next'

import React from 'react'
import localFont from 'next/font/local'
import { Italiana } from 'next/font/google'
import { Inter } from 'next/font/google'
import { cn } from '@/utilities/ui'
import { AdminBar } from '@/components/AdminBar'
import { draftMode } from 'next/headers'
// import { Footer } from '@/Footer/Component'
// import { Header } from '@/Header/Component'

import './styles.css'
import { Providers } from '@/providers'

export const metadata: Metadata = {
  description: 'A luxury hook and storage company for businesses and individuals.',
  title: "Ella'Fe | Elevating every detail",
}

const mulish = localFont({
  src: [
    {
      path: '../../../public/fonts/Mulish/Mulish-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Mulish/Mulish-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../../public/fonts/Mulish/Mulish-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Mulish/Mulish-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-mulish',
})

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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html
      className={cn(mulish.variable, italiana.variable, inter.variable)}
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
          {children}
        </Providers>
      </body>
    </html>
  )
}
