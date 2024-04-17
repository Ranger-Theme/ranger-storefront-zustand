import { useAppStore } from '@/providers'

const Header = () => {
  const storeConfig = useAppStore((state) => state.storeConfig)
  console.info('Header is render...')

  return <div>Header {storeConfig?.code}</div>
}

export default Header
