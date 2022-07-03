import { ThemeProvider } from '@mui/material'
import { StyledEngineProvider } from '@mui/material'
import theme from '../theme'
import '../styles/globals.scss'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default MyApp
