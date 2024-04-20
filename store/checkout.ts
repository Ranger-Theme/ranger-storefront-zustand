import type { StateCreator } from 'zustand'

export type Address = {
  id: number
  name: string
  address: string
  city: string
  state: string
  zip: string
  country: string
}

export type CheckoutValues = {
  loading: boolean
  billingAddress: Address | null
  shippingAddress: Address | null
}

export type CheckoutState = {
  checkout: Partial<CheckoutValues>
}

export type CheckoutActions = {
  setCheckoutLoading: (loading: boolean) => void
  setBillingAddress: (address: Address) => void
  setShippingAddress: (address: Address) => void
  resetCheckout: () => void
}

export type CheckoutStore = CheckoutState & CheckoutActions

export const checkoutState: CheckoutState = {
  checkout: {
    loading: false,
    billingAddress: null,
    shippingAddress: null
  }
}

export const createCheckoutSlice: StateCreator<
  CheckoutStore,
  [['zustand/devtools', never]],
  [],
  CheckoutStore
> = (set) => {
  return {
    ...checkoutState,
    setCheckoutLoading: (loading: boolean) =>
      set(
        (state) => {
          return {
            ...state,
            checkout: {
              ...state.checkout,
              loading
            }
          }
        },
        false,
        'checkout/setCheckoutLoading'
      ),
    setBillingAddress: (address: Address) =>
      set(
        (state) => {
          return {
            ...state,
            checkout: {
              ...state.checkout,
              billingAddress: address
            }
          }
        },
        false,
        'checkout/setBillingAddress'
      ),
    setShippingAddress: (address: Address) =>
      set(
        (state) => {
          return {
            ...state,
            checkout: {
              ...state.checkout,
              shippingAddress: address
            }
          }
        },
        false,
        'checkout/setShippingAddress'
      ),
    resetCheckout: () =>
      set(
        (state) => {
          return {
            ...state,
            checkout: {
              ...checkoutState.checkout
            }
          }
        },
        false,
        'checkout/reset'
      )
  }
}
