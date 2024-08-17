import type { StateCreator } from 'zustand'

export type I18nValues = {
  locale: string
  messages: any
}

export type I18nState = {
  i18n: Partial<I18nValues>
}

export type I18nActions = {
  setI18n: (values: any) => void
  resetI18n: () => void
}

export type I18nStore = I18nState & I18nActions

export const i18nState: I18nState = {
  i18n: {
    locale: '',
    messages: null
  }
}

export const createI18nSlice: StateCreator<
  I18nStore,
  [['zustand/devtools', never]],
  [],
  I18nStore
> = (set) => {
  return {
    ...i18nState,
    setI18n: (values: I18nValues) => {
      set(
        (state) => {
          return {
            ...state,
            i18n: {
              locale: values.locale,
              messages: values.messages
            }
          }
        },
        false,
        'i18n/setI18n'
      )
    },
    resetI18n: () =>
      set(
        (state) => {
          return {
            ...state,
            i18n: {
              ...i18nState.i18n
            }
          }
        },
        false,
        'i18n/reset'
      )
  }
}
