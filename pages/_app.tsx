import Head from 'next/head'
import { useRouter } from 'next/router'
import { NextIntlClientProvider } from 'next-intl'
import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter'
import { ThemeProvider } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import CssBaseline from '@mui/material/CssBaseline'
import type { AppProps, AppContext } from 'next/app'
import type { StoreApi } from 'zustand'
import '@/styles/globals.css'

import { theme } from '@/config'
import { withZustand } from '@/hoc'
import { ApiProvider, StoreProvider } from '@/providers'
import { queryClient } from '@/providers/client'
import { GET_STORE_CONFIG } from '@/graphql/getStoreConfig'
import { createClient } from '@/api'
import type { StoreConfigQuery } from '@/interfaces'
import type { NextState, NextStore } from '@/store'

import AppShell from '@/components/AppShell'
import NextPerformance from '@/components/NextPerformance'

type NextCtx = AppContext['ctx'] & {
  zustandStore: StoreApi<NextStore>
}

interface NextAppProps extends AppProps {
  messages: Record<string, any>
  initialState: NextState
}

interface NextAppContext extends Omit<AppContext, 'ctx'> {
  ctx: NextCtx
}

const fetchStoreQuery = async (locale: string) => {
  const client = createClient(locale)
  return await client.request<StoreConfigQuery>(GET_STORE_CONFIG)
}

const App = ({ Component, pageProps, initialState, messages, ...props }: NextAppProps) => {
  const router = useRouter()

  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="robots" content="INDEX,FOLLOW" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="Ranger" />
        <meta name="format-detection" content="telephone=no, email=no" />
        <meta name="application-name" content="Ranger" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Ranger" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-tap-highlight" content="no" />
      </Head>
      <NextIntlClientProvider locale={router.locale} messages={messages} timeZone="Europe/Vienna">
        <ApiProvider>
          <StoreProvider value={initialState}>
            <AppCacheProvider {...props}>
              <SnackbarProvider
                maxSnack={3}
                autoHideDuration={5000}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <AppShell>
                    <Component {...pageProps} />
                  </AppShell>
                  <NextPerformance />
                </ThemeProvider>
              </SnackbarProvider>
            </AppCacheProvider>
          </StoreProvider>
        </ApiProvider>
      </NextIntlClientProvider>
    </>
  )
}

App.getInitialProps = async ({ Component, ctx, router }: NextAppContext) => {
  // Fetch initial data from an API or any other data source
  const { zustandStore, req } = ctx
  const store: NextStore = zustandStore.getState()
  const locale: string = router.locale === router.defaultLocale ? '' : `${router.locale}/`
  const isClient: boolean = (!req || (req.url && req.url.startsWith('/_next/data'))) as boolean

  if (!isClient) {
    const result = await queryClient.fetchQuery({
      queryKey: ['storeConfig'],
      queryFn: () => fetchStoreQuery(locale)
    })
    store.setAppConfig(result)
  }

  // Call actions to update state
  const initialState: NextState = JSON.parse(JSON.stringify(zustandStore.getState()))
  const pageProps = Component.getInitialProps ? await Component.getInitialProps({ ...ctx }) : {}
  const messages = (await import(`../i18n/${ctx.locale}.json`)).default

  return { pageProps, messages, initialState }
}

export default withZustand(App)
