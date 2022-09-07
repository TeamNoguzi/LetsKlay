import GlobalStyle from "../styles/global";
import { addDecorator } from "@storybook/react";
import { ThemeProvider } from "@emotion/react";
import theme from "styles/theme";
import * as NextImage from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

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
