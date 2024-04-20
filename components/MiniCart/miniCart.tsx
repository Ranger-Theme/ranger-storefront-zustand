import { useStore } from '@/providers'

const MiniCart = () => {
  const { loading } = useStore((state) => state.checkout)
  console.info('MiniCart is render...')

  return (
    <div>
      <p>MiniCart {loading.toString()}</p>
    </div>
  )
}

export default MiniCart
