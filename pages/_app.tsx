import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { AppStoreProvider } from "@/providers";
import type { AppState } from "@/store";

interface NextAppProps extends AppProps {
  initialState: AppState;
}

const App = ({ Component, pageProps, initialState }: NextAppProps) => {
  return (
    <AppStoreProvider state={initialState}>
      <Component {...pageProps} />
    </AppStoreProvider>
  );
};

App.getInitialProps = async () => {
  // Fetch initial data from an API or any other data source
  const initialState: AppState = {
    count: 10,
  };

  return { initialState };
};

export default App;
