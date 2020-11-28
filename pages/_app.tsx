import React from "react";
import { AppProps } from "next/app";

import { ThemeProvider } from "theme-ui";

import theme from "../theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
