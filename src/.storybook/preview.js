import GlobalStyle from "../styles/global";
import { addDecorator } from "@storybook/react";
import { ThemeProvider } from "@emotion/react";
import theme from "styles/theme";

import "bootstrap/dist/css/bootstrap.min.css";

addDecorator((Story) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Story />
  </ThemeProvider>
));

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
