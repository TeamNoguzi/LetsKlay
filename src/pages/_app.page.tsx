import { ThemeProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import theme from "styles/theme";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SSRProvider } from "react-bootstrap";
import Modal from "stories/Modal";
import GlobalToast from "stories/Toasts";
import GlobalStyle from "styles/global";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

const queryClient = new QueryClient({});

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <SSRProvider>
        <QueryClientProvider client={queryClient}>
          <GlobalStyle />
          <Component {...pageProps} />
          <Modal />
          <GlobalToast />
        </QueryClientProvider>
      </SSRProvider>
    </ThemeProvider>
  );
}

export default MyApp;
