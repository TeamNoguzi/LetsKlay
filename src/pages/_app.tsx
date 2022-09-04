import { ThemeProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import theme from "styles/theme";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "stories/Modal";

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
      <Modal />
    </ThemeProvider>
  );
}

export default MyApp;
