import type { PropsWithChildren } from 'react'

import Header from '@/components/Header'
import MiniCart from '@/components/MiniCart'
import Footer from '@/components/Footer'

const AppShell = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <MiniCart />
      {children}
      <Footer />
    </>
  )
}

export default AppShell
