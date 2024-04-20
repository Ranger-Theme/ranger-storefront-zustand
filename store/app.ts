import type { StateCreator } from 'zustand'

export type AppValues = {
  count: number
  storeConfig: any
}

export type AppState = {
  app: AppValues
}

export type AppActions = {
  increment: () => void
  decrement: () => void
  resetApp: () => void
}

export type AppStore = AppState & AppActions

export const appState: AppState = {
  app: {
    count: 0,
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
