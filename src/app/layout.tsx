import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SessionWrapper } from './contexts/SessionWrapper'
import './globals.css'

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '700'] })

export const metadata: Metadata = {
  title: 'Ignite Call',
  description:
    'Create your scheduling in this app integrate with google calendar',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SessionWrapper>
      <html lang="pt-br" className={inter.className}>
        <body className="bg-gray-950 text-gray-100 antialiased">
          {children}
        </body>
      </html>
    </SessionWrapper>
  )
}
