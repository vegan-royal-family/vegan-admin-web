import "styles/reset.css";
import { Session } from "next-auth";
import type { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@emotion/react";
import theme from "../styles/theme";

const App = ({ Component, pageProps }: AppProps<{ session: Session }>) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>어쩌다보니 비건?!</title>
      </Head>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <SessionProvider session={pageProps.session}>
            <Component {...pageProps} />
          </SessionProvider>
        </ThemeProvider>
      </RecoilRoot>
    </>
  );
};

export default App;
