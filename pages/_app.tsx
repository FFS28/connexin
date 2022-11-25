import '../styles/globals.css'
import type { AppProps } from 'next/app'

import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return( 
    <>
      <Head>
        <title>Connexin-Health</title>
        <meta
          name="description"
          content="This is PreOp Connexin-Health Questionnaire project"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>)
}

export default MyApp
