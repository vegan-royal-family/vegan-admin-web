import "react-perfect-scrollbar/dist/css/styles.css";
import "styles/reset.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "@emotion/react";
import theme from "../styles/theme";
import { ApolloProvider } from "react-apollo";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import graphqlClient from "utils/graphqlClient";
import reactQueryClient from "utils/reactQueryClient";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>어쩌다보니 비건?!</title>
      </Head>
      <RecoilRoot>
        <ApolloProvider client={graphqlClient}>
          <QueryClientProvider client={reactQueryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <ThemeProvider theme={theme}>
              <Component {...pageProps} />
            </ThemeProvider>
          </QueryClientProvider>
        </ApolloProvider>
      </RecoilRoot>
    </>
  );
};

export default App;
