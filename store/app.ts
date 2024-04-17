import { createStore } from "zustand/vanilla";

export type AppState = {
  count: number;
};

export type AppActions = {
  increment: () => void;
  decrement: () => void;
  reset: () => void;
};

export type AppStore = AppState & AppActions;

export const defaultInitState: AppState = {
  count: 0,
};

export const createAppStore = (initState: AppState = defaultInitState) => {
  const store = createStore<AppStore>()((set) => {
    return {
      ...initState,
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
      reset: () => set(() => initState),
    };
  });

  return store;
};
