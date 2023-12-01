import RootLayout from "@/components/layout/RootLayout";
import SearchProvider, {
  initialState,
  searchReducer,
} from "@/lib/context/SearchProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useReducer } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  return (
    <SearchProvider state={state} dispatch={dispatch}>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </SearchProvider>
  );
}
