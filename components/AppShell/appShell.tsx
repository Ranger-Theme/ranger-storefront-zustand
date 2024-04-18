import type { PropsWithChildren } from 'react'

import Header from '@/components/Header'
import MiniCart from '@/components/MiniCart'

const AppShell = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <MiniCart />
      {children}
    </>
  )
}

export default AppShell
