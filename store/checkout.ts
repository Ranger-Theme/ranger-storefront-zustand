import { createStore } from 'zustand/vanilla'

export type Address = {
  id: number
  name: string
  address: string
  city: string
  state: string
  zip: string
  country: string
}

export type CheckoutState = {
  loading: boolean
  billingAddress?: Address | null
  shippingAddress?: Address | null
}

export type CheckoutActions = {
  setLoading: (loading: boolean) => void
  setBillingAddress: (address: Address) => void
  setShippingAddress: (address: Address) => void
  reset: () => void
}

export type CheckoutStore = CheckoutState & CheckoutActions

export const checkoutState: CheckoutState = {
  loading: false,
  billingAddress: null,
  shippingAddress: null
}

export const createCheckoutStore = (initState: CheckoutState = checkoutState) => {
  const store = createStore<CheckoutStore>()((set) => {
    return {
      ...initState,
      setLoading: (loading: boolean) =>
        set((state) => {
          return {
            ...state,
            loading
          }
        }),
      setBillingAddress: (address: Address) =>
        set((state) => {
          return {
            ...state,
            billingAddress: address
          }
        }),
      setShippingAddress: (address: Address) =>
        set((state) => {
          return {
            ...state,
            shippingAddress: address
          }
        }),

      reset: () => set(() => initState)
    }
  })

  return store
}
