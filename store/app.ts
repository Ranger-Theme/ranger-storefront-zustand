import type { StateCreator } from 'zustand'

export type AppValues = {
  count: number
  currency: any
  storeConfig: any
}

export type AppState = {
  app: AppValues
}

export type AppActions = {
  increment: () => void
  decrement: () => void
  setAppConfig: (config: any) => void
  resetApp: () => void
}

export type AppStore = AppState & AppActions

export const appState: AppState = {
  app: {
    count: 0,
    currency: null,
    storeConfig: null
  }
}

export const createAppSlice: StateCreator<AppStore, [['zustand/devtools', never]], [], AppStore> = (
  set,
  get
) => {
  return {
    ...appState,
    increment: () =>
      set(
        (state) => {
          return {
            ...state,
            app: {
              ...state.app,
              count: get().app.count + 1
            }
          }
        },
        false,
        'app/increment'
      ),
    decrement: () =>
      set(
        (state) => {
          return {
            ...state,
            app: {
              ...state.app,
              count: get().app.count - 1
            }
          }
        },
        false,
        'app/decrement'
      ),
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
