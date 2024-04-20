import { createContext, useRef, useContext } from 'react'
import { useStore as useZustandStore } from 'zustand'
import type { ReactNode } from 'react'
import type { StoreApi } from 'zustand'

import { initializeStore } from '@/store'
import type { NextStore, NextState } from '@/store'

const StoreContext = createContext<StoreApi<NextStore> | null>(null)

export interface StoreProviderProps {
  children: ReactNode | undefined
  value: NextState
}

export const StoreProvider = ({ children, value }: StoreProviderProps) => {
  const storeRef = useRef<StoreApi<NextStore>>()

  if (!storeRef.current) {
    storeRef.current = initializeStore(value)
  }

  return <StoreContext.Provider value={storeRef.current}>{children}</StoreContext.Provider>
}

export const useStore = <T,>(selector: (store: NextStore) => T): T => {
  const store = useContext(StoreContext)

  if (!store) {
    throw new Error(`useNextStore must be use within AppStoreProvider`)
  }

  return useZustandStore(store, selector)
}
