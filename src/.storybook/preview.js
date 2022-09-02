import GlobalStyle from "../styles/global";
import { addDecorator } from "@storybook/react";

addDecorator((Story) => (
  <>
    <GlobalStyle />
    <Story />
  </>
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
