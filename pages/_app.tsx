import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { withZustand } from '@/hoc'
import { NextStoreProvider } from '@/providers'
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
  return (
    <NextStoreProvider state={initialState}>
      <Header />
      <MiniCart />
      <Component {...pageProps} />
    </NextStoreProvider>
  )
}

App.getInitialProps = async ({ Component, ctx }: InitialPage) => {
  // Fetch initial data from an API or any other data source
  const { initialState } = ctx
  // const initialState: NextState = {
  //   app: {
  //     count: 10,
  //     storeConfig: {
  //       code: 'US'
  //     }
  //   },
  //   checkout: {
  //     loading: true
  //   }
  // }

  // return { initialState }
  const pageProps = Component.getInitialProps ? await Component.getInitialProps({ ...ctx }) : {}

  return { pageProps }
}

export default withZustand(App, {
  app: {
    count: 10,
    storeConfig: {
      code: 'US'
    }
  },
  checkout: {
    loading: true
  }
})
