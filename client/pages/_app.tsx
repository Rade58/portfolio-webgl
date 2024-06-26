import React from "react";
import { Global } from "@emotion/react";
import { AppProps } from "next/app";

import { ThemeProvider } from "theme-ui";

import theme from "../theme";

/* console.log({ blah: JSON.stringify(theme.styles.h1) }); */

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Global
        styles={{
          body: {
            width: "100vw",
            // display: "flex",
            // justifyContent: "center",
            // alignItems: "center",
            // flexDirection: "row",
            boxSizing: "border-box",
            margin: 0,
          },
          html: {
            width: "100vw",
            // display: "flex",
            // justifyContent: "center",
            // alignItems: "center",
            // flexDirection: "row",
            boxSizing: "border-box",
          },
        }}
      />

      <Component {...pageProps} />
    </ThemeProvider>
  );
}
