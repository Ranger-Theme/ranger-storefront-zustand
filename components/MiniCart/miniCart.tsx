import { useCheckoutStore } from '@/providers'

const MiniCart = () => {
  const { loading } = useCheckoutStore((state) => state)
  console.info('MiniCart is render...')

  return (
    <div>
      <p>MiniCart {loading.toString()}</p>
    </div>
  )
}

export default MiniCart
