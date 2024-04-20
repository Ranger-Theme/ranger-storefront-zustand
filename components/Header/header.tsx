import { useStore } from '@/providers'

const Header = () => {
  const storeConfig = useStore((state) => state.app.storeConfig)
  console.info('Header is render...')

  return <div>Header {storeConfig?.code}</div>
}

export default Header
