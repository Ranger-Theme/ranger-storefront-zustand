import '@/styles/globals.css'
import type { AppProps, AppContext } from 'next/app'
import type { StoreApi } from 'zustand'
import { request } from 'graphql-request'

import { withZustand } from '@/hoc'
import { ApiProvider, StoreProvider } from '@/providers'
import { queryClient } from '@/providers/client'
import { type StoreConfigQuery, GET_STORE_CONFIG } from '@/graphql/getStoreConfig'
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

const useStoreQuery = async () =>
  // await request<StoreConfigQuery, { id: string }>(
  //   process.env.NEXT_PUBLIC_GRAPHQL_URL,
  //   GET_STORE_CONFIG,
  //   {
  //     id: '2'
  //   }
  // )
  await request<StoreConfigQuery>(process.env.NEXT_PUBLIC_GRAPHQL_URL, GET_STORE_CONFIG)

const App = ({ Component, pageProps, initialState }: NextAppProps) => {
  return (
    <ApiProvider>
      <StoreProvider value={initialState}>
        <AppShell>
          <Component {...pageProps} />
        </AppShell>
      </StoreProvider>
    </ApiProvider>
  )
}

App.getInitialProps = async ({ Component, ctx }: NextAppContext) => {
  // Fetch initial data from an API or any other data source
  const { zustandStore } = ctx
  const store: NextStore = zustandStore.getState()

  const result = await queryClient.fetchQuery({
    queryKey: ['storeConfig'],
    queryFn: useStoreQuery
  })
  store.setAppConfig(result)

  // Call actions to update state
  const initialState: NextState = JSON.parse(JSON.stringify(zustandStore.getState()))
  const pageProps = Component.getInitialProps ? await Component.getInitialProps({ ...ctx }) : {}

  return { pageProps, initialState }
}

export default withZustand(App)
