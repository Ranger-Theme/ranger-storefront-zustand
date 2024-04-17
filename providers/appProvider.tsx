import { createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'
import type { ReactNode } from 'react'

import { createNextStore } from '@/store'
import type { NextStore, NextState, AppStore } from '@/store'

const AppStoreContext = createContext<NextStore | null>(null)

export interface AppStoreProviderProps {
  children: ReactNode
  state: NextState
}

export const AppStoreProvider = ({ children, state }: AppStoreProviderProps) => {
  const storeRef = useRef<NextStore>()

  if (!storeRef.current) {
    storeRef.current = createNextStore(state)
  }

  return <AppStoreContext.Provider value={storeRef.current}>{children}</AppStoreContext.Provider>
}

export const useAppStore = <T,>(selector: (store: AppStore) => T): T => {
  const appStoreContext = useContext(AppStoreContext)

  if (!appStoreContext) {
    throw new Error(`useAppStore must be use within AppStoreProvider`)
  }

  return useStore(appStoreContext.app, selector)
}
