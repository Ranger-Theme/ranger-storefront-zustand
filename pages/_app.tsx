import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { withZustand } from '@/hoc'
import { initializeStore, useCreateStore, Provider } from '@/lib/store'
import { StoreProvider } from '@/providers'
import { nextState } from '@/store'
import type { NextState } from '@/store'

import Header from '@/components/Header'
import MiniCart from '@/components/MiniCart'

interface NextAppProps extends AppProps {
  initialState: NextState
}

interface InitialPage {
  Component: any
  ctx: any
}

const App = ({ Component, pageProps, initialState }: NextAppProps) => {
  // console.info('initialZustandState:', initialState, initialZustandState)
  return (
    <StoreProvider value={initialState}>
      <Header />
      <MiniCart />
      <Component {...pageProps} />
    </StoreProvider>
  )
}

App.getInitialProps = async ({ Component, ctx }: InitialPage) => {
  // Fetch initial data from an API or any other data source
  const { zustandStore } = ctx
  // const zustandStore = initializeStore()
  const state: any = zustandStore.getState()
  console.log(state)
  // ctx.initialState.count = 10
  state.increment()

  // const initialZustandState = JSON.parse(JSON.stringify(state))
  // console.log(initialZustandState)
  const initialState: NextState = {
    app: {
      count: 10,
      storeConfig: {
        code: 'US'
      }
    },
    checkout: {
      loading: true
    }
  }
  ctx.initialState = initialState

  // return { initialState }
  const pageProps = Component.getInitialProps ? await Component.getInitialProps({ ...ctx }) : {}

  return { pageProps, initialState }
}

export default withZustand(App)
