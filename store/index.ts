import type { StoreApi } from 'zustand'

import { createAppStore, appState } from './app'
import { createCheckoutStore, checkoutState } from './checkout'
import type { AppState, AppActions, AppStore } from './app'
import type { CheckoutState, CheckoutActions, CheckoutStore } from './checkout'

export type NextState = {
  app: AppState
  checkout: CheckoutState
}

export type NextStore = {
  app: StoreApi<AppStore>
  checkout: StoreApi<CheckoutStore>
}

export const nextState: NextState = {
  app: appState,
  checkout: checkoutState
}

export const initializeStore = (initState: Partial<NextState> = {}): NextStore => {
  const { app, checkout } = initState
  const appStore: StoreApi<AppStore> = createAppStore(app)
  const checkoutStore: StoreApi<CheckoutStore> = createCheckoutStore(checkout)

  return {
    app: appStore,
    checkout: checkoutStore
  }
}

export type { AppState, AppActions, AppStore, CheckoutState, CheckoutActions, CheckoutStore }
