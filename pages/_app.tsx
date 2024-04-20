import '@/styles/globals.css'
import type { AppProps, AppContext } from 'next/app'
import type { StoreApi } from 'zustand'

import { withZustand } from '@/hoc'
import { StoreProvider } from '@/providers'
import type { NextState, NextStore, AppStore } from '@/store'

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

const App = ({ Component, pageProps, initialState }: NextAppProps) => {
  console.info('initialState:', initialState)

  return (
    <StoreProvider value={initialState}>
      {/* <AppShell> */}
      <Component {...pageProps} />
      {/* </AppShell> */}
    </StoreProvider>
  )
}

App.getInitialProps = async ({ Component, ctx }: NextAppContext) => {
  // Fetch initial data from an API or any other data source
  const { zustandStore } = ctx
  const store: NextStore = zustandStore.getState()

  store.increment()
  store.increment()

  // Call actions to update state
  const initialState: NextState = JSON.parse(JSON.stringify(zustandStore.getState()))

  const pageProps = Component.getInitialProps ? await Component.getInitialProps({ ...ctx }) : {}

  return { pageProps, initialState }
}

export default withZustand(App)
