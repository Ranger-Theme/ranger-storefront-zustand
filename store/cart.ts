import type { StateCreator } from 'zustand'

export type CheckoutValues = {
  cartId: string
  cartDetail: any
  loading: boolean
}

export type CartState = {
  cart: Partial<CheckoutValues>
}

export type CartActions = {
  setCart: (values: any) => void
  setCartLoading: (loading: boolean) => void
  resetCart: () => void
}

export type CartStore = CartState & CartActions

export const cartState: CartState = {
  cart: {
    cartId: '',
    cartDetail: null,
    loading: false
  }
}

export const createCartSlice: StateCreator<
  CartStore,
  [['zustand/devtools', never]],
  [],
  CartStore
> = (set) => {
  return {
    ...cartState,
    setCart: (values: any) => {
      set(
        (state) => {
          return {
            ...state,
            cart: {
              cartId: values.id,
              cartDetail: values.details
            }
          }
        },
        false,
        'cart/setCart'
      )
    },
    setCartLoading: (loading: boolean) => {
      set(
        (state) => {
          return {
            ...state,
            cart: {
              ...state.cart,
              loading
            }
          }
        },
        false,
        'cart/setCartLoading'
      )
    },
    resetCart: () =>
      set(
        (state) => {
          return {
            ...state,
            cart: {
              ...cartState.cart
            }
          }
        },
        false,
        'cart/reset'
      )
  }
}
