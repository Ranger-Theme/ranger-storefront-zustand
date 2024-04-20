// import { useAppStore } from '@/providers'

import HomePage from '@/components/HomePage'

const Home = () => {
  // const { count, increment, decrement, reset } = useAppStore((state) => state)

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24`}>
      {/* <div>
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
      </div> */}
      <HomePage />
    </main>
  )
}

Home.getInitialProps = async ({ ...ctx }: any) => {
  // console.info('ctx:', ctx.zustandStore.app.getState())

  return {}
}

export default Home
