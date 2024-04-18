import { createStore } from 'zustand/vanilla'

export type AppState = {
  count: number
  storeConfig: any
}

export type AppActions = {
  increment: () => void
  decrement: () => void
  reset: () => void
}

export type AppStore = AppState & AppActions

export const appState: AppState = {
  count: 0,
  storeConfig: null
}

export const createAppStore = (initState: AppState = appState) => {
  const store = createStore<AppStore>()((set, get) => {
    return {
      ...initState,
      increment: () => {
        set({
          count: get().count + 1
        })
      },
      decrement: () => set((state) => ({ count: state.count - 1 })),
      reset: () => set(() => initState)
    }
  })

  return store
}
