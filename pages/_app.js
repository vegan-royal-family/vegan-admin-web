import Head from "next/head";
import PropTypes from "prop-types";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@emotion/react";
import { palette } from "../styles/palette";
const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>어쩌다보니 비건?!</title>
      </Head>
      <ThemeProvider theme={palette}>
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      </ThemeProvider>
    </>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default App;
