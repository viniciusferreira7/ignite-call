import '../lib/dayjs'

import type { Metadata } from 'next'
import { Inter, Roboto } from 'next/font/google'
import { QueryClientWrapper } from './contexts/query-client-wrapper'
import { SessionWrapper } from './contexts/session-wrapper'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-inter',
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700'],
  variable: '--font-robot',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Ignite Call',
    absolute: 'Ignite Call',
  },
  description:
    'Criar o seu agendamento nesta aplicação integrar com o google calendar',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SessionWrapper>
      <QueryClientWrapper>
        <html lang="pt-br" className={`${inter.variable} ${roboto.variable}`}>
          <body
            className="bg-gray-950 font-roboto text-gray-100 antialiased"
            suppressHydrationWarning={true}
          >
            {children}
          </body>
        </html>
      </QueryClientWrapper>
    </SessionWrapper>
  )
}
