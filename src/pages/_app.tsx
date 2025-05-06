import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { InscripcionesProvider } from '@/context/InscripcionesContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <InscripcionesProvider>
      <Component {...pageProps} />
    </InscripcionesProvider>
  )
}