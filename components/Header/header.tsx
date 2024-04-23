import { useStore } from '@/providers'

const Header = () => {
  const storeConfig = useStore((state) => state.app.storeConfig)

  return <div>Header {storeConfig?.code}</div>
}

export default Header
