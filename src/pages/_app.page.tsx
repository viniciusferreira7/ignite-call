import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { globalStyles } from '../styles/globals'
import Head from 'next/head'

globalStyles()

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Ignite Call</title>
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
