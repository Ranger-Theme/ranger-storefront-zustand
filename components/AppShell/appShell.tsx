import { useEffect } from 'react'
import { useSnackbar } from 'notistack'
import type { PropsWithChildren } from 'react'

import Header from '@/components/Header'
import MiniCart from '@/components/MiniCart'
import Footer from '@/components/Footer'

const AppShell = ({ children }: PropsWithChildren) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  useEffect(() => {
    window.snackbar = {
      open: (message: any, options: any = {}) => enqueueSnackbar(message, options),
      close: (key: any) => closeSnackbar(key)
    }
  }, [])

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
