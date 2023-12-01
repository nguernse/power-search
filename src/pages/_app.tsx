import RootLayout from "@/components/layout/RootLayout";
import SearchProvider from "@/lib/context/SearchProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SearchProvider>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </SearchProvider>
  );
}
