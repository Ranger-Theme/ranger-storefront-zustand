import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { NextStoreProvider } from '@/providers'
import type { NextState } from '@/store'

interface NextAppProps extends AppProps {
  initialState: NextState
}

const App = ({ Component, pageProps, initialState }: NextAppProps) => {
  return (
    <NextStoreProvider state={initialState}>
      <Component {...pageProps} />
    </NextStoreProvider>
  )
}

App.getInitialProps = async () => {
  // Fetch initial data from an API or any other data source
  const initialState: NextState = {
    app: {
      count: 10
    }
  }

  return { initialState }
}

export default App
