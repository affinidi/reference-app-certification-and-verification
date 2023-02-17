import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";

import { theme } from "utils/theme";
import { AuthProvider } from "contexts/AuthContext";
import { NavBar, ToastsContainer } from "components";
import { AuthRedirect } from "pages/components/Authorisation/AuthRedirect";

import "../styles/fonts.css";
import "../styles/globals.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AuthRedirect>
            <NavBar />
            <Component {...pageProps} />
          </AuthRedirect>
        </AuthProvider>
        <ToastsContainer />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
