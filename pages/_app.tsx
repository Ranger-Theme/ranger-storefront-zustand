import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { withZustand } from '@/hoc'
import { useCreateStore } from '@/lib/store'
import { StoreProvider } from '@/providers'
import { nextState } from '@/store'
import type { NextState, NextStore } from '@/store'

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
  console.info('initialState:', initialState)

  return (
    <>
      {/* <StoreProvider value={initialState}> */}
      {/* <Header />
      <MiniCart /> */}
      <Component {...pageProps} />
      {/* </StoreProvider> */}
    </>
  )
}

App.getInitialProps = async ({ Component, ctx }: InitialPage) => {
  // Fetch initial data from an API or any other data source
  const { zustandStore } = ctx
  const state: any = zustandStore.getState()

  // Call actions to update state
  state.increment()
  state.increment()

  const initialState: any = JSON.parse(JSON.stringify(zustandStore.getState()))
  console.info(initialState)

  const pageProps = Component.getInitialProps ? await Component.getInitialProps({ ...ctx }) : {}

  return { pageProps, initialState }
}

export default withZustand(App)
