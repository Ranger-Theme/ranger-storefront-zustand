import type { StateCreator, StoreMutatorIdentifier } from 'zustand'

type Logger = <
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = []
>(
  fn: StateCreator<T, Mps, Mcs>,
  name?: string
) => StateCreator<T, Mps, Mcs>

type LoggerImpl = <T>(fn: StateCreator<T, [], []>, name?: string) => StateCreator<T, [], []>

const loggerImpl: LoggerImpl = (fn, name) => (set, get, store) => {
  const loggedSet: typeof set = (...args) => {
    console.info(...(name ? [`${name}: applying`] : []), args)
    set(...args)

    const state: any = store.getState()
    const newState: any = {}
    Object.keys(state).forEach((key: string) => {
      if (typeof state[key] !== 'function') {
        newState[key] = state[key]
      }
    })

    console.info(...(name ? [`${name}: new state`] : []), newState)
  }
  const { setState } = store
  store.setState = (...args) => {
    console.info(...(name ? [`${name}: applying`] : []), args)
    setState(...args)
    console.info(...(name ? [`${name}: new state`] : []), store.getState())
  }

  return fn(loggedSet, get, store)
}

export const logger = loggerImpl as unknown as Logger
