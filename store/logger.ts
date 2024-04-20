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
    console.log(...(name ? [`${name}: applying`] : []), args)
    set(...args)
    console.log(...(name ? [`${name}: new state`] : []), store.getState())
  }
  const setState = store.setState
  store.setState = (...args) => {
    console.log(...(name ? [`${name}: applying`] : []), args)
    setState(...args)
    console.log(...(name ? [`${name}: new state`] : []), store.getState())
  }

  return fn(loggedSet, get, store)
}

export const logger = loggerImpl as unknown as Logger
