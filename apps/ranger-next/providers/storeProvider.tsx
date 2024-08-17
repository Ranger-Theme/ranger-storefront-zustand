import type { ReactNode } from 'react'
import { createContext, useContext, useRef } from 'react'
import type { StoreApi } from 'zustand'
import { useStore as useZustandStore } from 'zustand'

import type { NextState, NextStore } from '@/store'
import { initializeStore } from '@/store'

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
    throw new Error('useNextStore must be use within StoreProvider')
  }

  return useZustandStore(store, selector)
}
