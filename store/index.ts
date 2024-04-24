import { createStore } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { StoreApi, StateCreator, StoreMutatorIdentifier } from 'zustand'

import { logger } from './logger'
import { createAppSlice, appState } from './app'
import { createCartSlice, cartState } from './cart'
import { createCheckoutSlice, checkoutState } from './checkout'
import type { AppState, AppActions, AppStore } from './app'
import type { CartState, CartActions, CartStore } from './cart'
import type { CheckoutState, CheckoutActions, CheckoutStore } from './checkout'

declare global {
  interface Window {
    __ZUSTAND_STORE__: StoreApi<NextStore>
  }
}

export type NextState = AppState & CartState & CheckoutState

export type NextStore = AppStore & CartStore & CheckoutStore

export const nextState: NextState = {
  ...appState,
  ...cartState,
  ...checkoutState
}

export type Middlewares = <
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = []
>(
  fn: StateCreator<T, [...Mps, ['zustand/devtools', never]], Mcs>
) => StateCreator<T, Mps, [['zustand/devtools', never], ...Mcs]>

export const createInitStore = (initState?: NextState) => {
  const middlewares: Middlewares = (f) => devtools(logger(f, 'zustand'))

  const store = createStore<NextStore>()(
    middlewares((...args) => {
      return {
        ...createAppSlice(...args),
        ...createCartSlice(...args),
        ...createCheckoutSlice(...args),
        ...initState
      }
    })
  )

  return store
}

export const initializeStore = (initState?: NextState) => {
  if (typeof window === 'undefined') {
    return createInitStore(initState)
  }

  if (!window?.__ZUSTAND_STORE__?.getState()?.app?.storeConfig) {
    window.__ZUSTAND_STORE__ = createInitStore(initState)

    return createInitStore(initState)
  }

  return window.__ZUSTAND_STORE__
}

export type {
  AppState,
  AppActions,
  AppStore,
  CartState,
  CartActions,
  CartStore,
  CheckoutState,
  CheckoutActions,
  CheckoutStore
}
