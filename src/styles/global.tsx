import { Global, css } from "@emotion/react";
// import Mulish from "public/fonts/Mulish/Mulish-VariableFont_wght.ttf";
// import MulishItalic from "public/fonts/Mulish/Mulish-Italic-VariableFont_wght.ttf";
import theme from "./theme";

const GlobalStyle = () => (
  <Global
    styles={css`
      @font-face {
        font-family: "Mulish";
        src: url("/fonts/Mulish/Mulish-VariableFont_wght.ttf"),
          url("public/fonts/Mulish/Mulish-VariableFont_wght.ttf");
      }
      @font-face {
        font-family: "Mulish";
        font-style: italic;
        src: url("/fonts/Mulish/Mulish-Italic-VariableFont_wght.ttf"),
          url("public/fonts/Mulish/Mulish-VariableFont_wght.ttf");
      }

      * {
        font-family: "Mulish", san-serif;
      }

      .btn,
      .btn-close {
        &&&:focus {
          box-shadow: none;
        }
      }

      .form-control {
        &&&:focus {
          box-shadow: none;
          border-color: ${theme.colors.secondary};
        }
      }
    `}
  />
);

export default GlobalStyle;
