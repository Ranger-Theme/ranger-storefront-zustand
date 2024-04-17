import { createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import type { ReactNode } from "react";
import type { StoreApi } from "zustand";

import { createAppStore } from "@/store";
import type { AppStore, AppState } from "@/store";

const AppStoreContext = createContext<StoreApi<AppStore> | null>(null);

export interface AppStoreProviderProps {
  children: ReactNode;
  state: AppState;
}

export const AppStoreProvider = ({
  children,
  state,
}: AppStoreProviderProps) => {
  const storeRef = useRef<StoreApi<AppStore>>();

  if (!storeRef.current) {
    storeRef.current = createAppStore(state);
  }

  return (
    <AppStoreContext.Provider value={storeRef.current}>
      {children}
    </AppStoreContext.Provider>
  );
};

export const useAppStore = <T,>(selector: (store: AppStore) => T): T => {
  const appStoreContext = useContext(AppStoreContext);

  if (!appStoreContext) {
    throw new Error(`useAppStore must be use within AppStoreProvider`);
  }

  return useStore(appStoreContext, selector);
};
