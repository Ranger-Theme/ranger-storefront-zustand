import { useStore } from '@/providers'

import HomePage from '@/components/HomePage'

const Home = () => {
  const { app, increment, decrement, resetApp } = useStore((state) => state)
  const { count } = app

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24`}>
      <div>
        Count: {count}
        <hr />
        <button type="button" onClick={() => increment()}>
          Increment
        </button>
        <br />
        <button type="button" onClick={() => decrement()}>
          Decrement
        </button>
        <br />
        <button type="button" onClick={() => resetApp()}>
          Reset
        </button>
      </div>
      <HomePage />
    </main>
  )
}

Home.getInitialProps = async ({ ...ctx }: any) => {
  // console.info('ctx:', ctx.zustandStore.getState().app)

  return {}
}

export default Home
