import Head from 'next/head'
import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter'
import { ThemeProvider } from '@mui/material'
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

type NextCtx = AppContext['ctx'] & {
  zustandStore: StoreApi<NextStore>
}

interface NextAppProps extends AppProps {
  initialState: NextState
}

interface NextAppContext extends Omit<AppContext, 'ctx'> {
  ctx: NextCtx
}

const fetchStoreQuery = async () => {
  const client = createClient()
  return await client.request<StoreConfigQuery>(GET_STORE_CONFIG)
}

const App = ({ Component, pageProps, initialState, ...props }: NextAppProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ApiProvider>
        <StoreProvider value={initialState}>
          <AppCacheProvider {...props}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <AppShell>
                <Component {...pageProps} />
              </AppShell>
            </ThemeProvider>
          </AppCacheProvider>
        </StoreProvider>
      </ApiProvider>
    </>
  )
}

App.getInitialProps = async ({ Component, ctx }: NextAppContext) => {
  // Fetch initial data from an API or any other data source
  const { zustandStore } = ctx
  const store: NextStore = zustandStore.getState()

  const result = await queryClient.fetchQuery({
    queryKey: ['storeConfig'],
    queryFn: fetchStoreQuery
  })
  store.setAppConfig(result)

  // Call actions to update state
  const initialState: NextState = JSON.parse(JSON.stringify(zustandStore.getState()))
  const pageProps = Component.getInitialProps ? await Component.getInitialProps({ ...ctx }) : {}

  return { pageProps, initialState }
}

export default withZustand(App)
