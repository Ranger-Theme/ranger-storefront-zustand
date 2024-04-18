import { createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'
import type { ReactNode } from 'react'

import { createStore } from '@/store'
import type { NextStore, NextState, AppStore, CheckoutStore } from '@/store'

const StoreContext = createContext<NextStore | null>(null)

export interface StoreProviderProps {
  children: ReactNode
  value: NextState
}

export const getDefaultInitialState = () => ({
  lastUpdate: Date.now(),
  light: false,
  count: 0
})

export const StoreProvider = ({ children, value }: StoreProviderProps) => {
  const storeRef = useRef<NextStore>()

  if (!storeRef.current) {
    storeRef.current = createStore(value)
  }

  return <StoreContext.Provider value={storeRef.current}>{children}</StoreContext.Provider>
}

export const initializeStore = (preloadedState = {}) => {}

export const useAppStore = <T,>(selector: (store: AppStore) => T): T => {
  const store = useContext(StoreContext)

  if (!store) {
    throw new Error(`useAppStore must be use within AppStoreProvider`)
  }

  return useStore(store.app, selector)
}

export const useCheckoutStore = <T,>(selector: (store: CheckoutStore) => T): T => {
  const store = useContext(StoreContext)

  if (!store) {
    throw new Error(`useCheckoutStore must be use within AppStoreProvider`)
  }

  return useStore(store.checkout, selector)
}
