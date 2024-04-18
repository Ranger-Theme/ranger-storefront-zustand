import { useAppStore } from '@/providers'

import HomePage from '@/components/HomePage'

const Home = () => {
  const { count, increment, decrement, reset } = useAppStore((state) => state)
  // console.log(count)

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
        <button type="button" onClick={() => reset()}>
          Reset
        </button>
      </div>
      <HomePage />
    </main>
  )
}

Home.getInitialProps = async ({ initialState, ...ctx }: any) => {
  // const state = initialState
  // console.info('initialState:', zustandStore().getState())
  console.info('ctx:', ctx.zustandStore.getState())

  return {}
}

export default Home
