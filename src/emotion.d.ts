import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      primary: string;
      primaryBold: string;
      primaryLight: string;
      secondary: string;
      secondaryBold: string;
      secondaryLight: string;
      black: string;
      blackLight: string;
    };
  }
}
