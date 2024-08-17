import type { StateCreator } from 'zustand'

import type { StoreConfigQuery } from '@/interfaces'

export type AppValues = {
  currency: StoreConfigQuery['currency'] | null
  storeConfig: StoreConfigQuery['storeConfig'] | null
}

export type AppState = {
  app: AppValues
}

export type AppActions = {
  setAppConfig: (config: any) => void
  resetApp: () => void
}

export type AppStore = AppState & AppActions

export const appState: AppState = {
  app: {
    currency: null,
    storeConfig: null
  }
}

export const createAppSlice: StateCreator<AppStore, [['zustand/devtools', never]], [], AppStore> = (
  set
) => {
  return {
    ...appState,
    setAppConfig: (config) =>
      set(
        (state) => {
          return {
            ...state,
            app: {
              ...state.app,
              ...config
            }
          }
        },
        false,
        'app/setAppConfig'
      ),
    resetApp: () =>
      set(
        (state) => {
          return {
            ...state,
            app: {
              ...appState.app
            }
          }
        },
        false,
        'app/reset'
      )
  }
}
