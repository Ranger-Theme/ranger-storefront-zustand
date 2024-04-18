import type { AppProps, AppContext } from 'next/app'
import '@/styles/globals.css'

import { withZustand } from '@/hoc'
import { StoreProvider } from '@/providers'
import type { NextState, NextStore, AppStore } from '@/store'

import AppShell from '@/components/AppShell'

type NextCtx = AppContext['ctx'] & {
  zustandStore: NextStore
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
      <AppShell>
        <Component {...pageProps} />
      </AppShell>
    </StoreProvider>
  )
}

App.getInitialProps = async ({ Component, ctx }: NextAppContext) => {
  // Fetch initial data from an API or any other data source
  const { zustandStore } = ctx
  const { app, checkout } = zustandStore
  const appStore: AppStore = app.getState()

  appStore.increment()
  appStore.increment()

  // Call actions to update state
  const initialState: NextState = {
    app: JSON.parse(JSON.stringify(app.getState())),
    checkout: JSON.parse(JSON.stringify(checkout.getState()))
  }

  const pageProps = Component.getInitialProps ? await Component.getInitialProps({ ...ctx }) : {}

  return { pageProps, initialState }
}

export default withZustand(App)
