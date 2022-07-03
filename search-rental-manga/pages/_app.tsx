import { ThemeProvider } from '@mui/material'
import { StyledEngineProvider } from '@mui/material'
import theme from '../theme'
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Head>
          <title>レンタルマンガ横断検索</title>
        </Head>
        <Component {...pageProps} />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default MyApp
