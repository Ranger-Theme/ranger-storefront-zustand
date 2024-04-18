import { useLayoutEffect } from 'react'
import { createStore } from 'zustand'
import createContext from 'zustand/context'

let store: any

const getDefaultInitialState = () => ({
  light: false,
  count: 0
})

const zustandContext = createContext()

export const Provider = zustandContext.Provider
// An example of how to still gets types in JS
/** @type {import('zustand/index').UseStore<typeof initialState>} */
export const useStore = zustandContext.useStore

export const initializeStore = (preloadedState = {}) => {
  return createStore((set, get) => ({
    ...getDefaultInitialState(),
    ...preloadedState,
    increment: () => {
      set({
        count: get().count + 1
      })
    },
    decrement: () => {
      set({
        count: get().count - 1
      })
    },
    reset: () => {
      set({ count: getDefaultInitialState().count })
    }
  }))
}

export const useCreateStore = (serverInitialState: any) => {
  // Server side code: For SSR & SSG, always use a new store.
  if (typeof window === 'undefined') {
    return () => initializeStore(serverInitialState)
  }
  // End of server side code

  // Client side code:
  // Next.js always re-uses same store regardless of
  // whether page is a SSR or SSG or CSR type.
  const isReusingStore = Boolean(store)
  store = store ?? initializeStore(serverInitialState)
  // So if next re-renders _app while re-using an older store,
  // then merge states in the next render cycle.
  // (Why next render cycle? Because react cannot re-render
  // while a render is already in progress. i.e. we cannot
  // do a setState() as that will initiate a re-render)
  //
  // eslint complaining "React Hooks must be called in the exact same order in every component render"
  // is ignorable as this code runs in same order in a given environment (i.e. client or server)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useLayoutEffect(() => {
    if (isReusingStore) {
      store.setState(
        {
          // re-use functions from existing store
          ...store.getState(),
          // but reset all other properties.
          // serverInitialState is undefined for CSR pages
          ...(serverInitialState || getDefaultInitialState())
        },
        true
      )
    }
  })

  return () => store
}
