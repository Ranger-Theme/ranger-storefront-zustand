import { createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'
import type { ReactNode } from 'react'

import { createNextStore } from '@/store'
import type { NextStore, NextState, AppStore, CheckoutStore } from '@/store'

const NextStoreContext = createContext<NextStore | null>(null)

export interface NextStoreProviderProps {
  children: ReactNode
  state: NextState
}

export const NextStoreProvider = ({ children, state }: NextStoreProviderProps) => {
  const storeRef = useRef<NextStore>()

  if (!storeRef.current) {
    storeRef.current = createNextStore(state)
  }

  return <NextStoreContext.Provider value={storeRef.current}>{children}</NextStoreContext.Provider>
}

export const useAppStore = <T,>(selector: (store: AppStore) => T): T => {
  const nextStoreContext = useContext(NextStoreContext)

  if (!nextStoreContext) {
    throw new Error(`useAppStore must be use within AppStoreProvider`)
  }

  return useStore(nextStoreContext.app, selector)
}

export const useCheckoutStore = <T,>(selector: (store: CheckoutStore) => T): T => {
  const nextStoreContext = useContext(NextStoreContext)

  if (!nextStoreContext) {
    throw new Error(`useAppStore must be use within AppStoreProvider`)
  }

  return useStore(nextStoreContext.checkout, selector)
}
