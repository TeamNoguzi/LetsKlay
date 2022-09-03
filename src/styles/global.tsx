import { Global, css } from "@emotion/react";
import Mulish from "public/fonts/Mulish/Mulish-VariableFont_wght.ttf";
import MulishItalic from "public/fonts/Mulish/Mulish-Italic-VariableFont_wght.ttf";

const GlobalStyle = () => (
  <Global
    styles={css`
      @font-face {
        font-family: "Mulish";
        src: url(${Mulish});
      }
      @font-face {
        font-family: "Mulish";
        font-style: italic;
        src: url(${MulishItalic});
      }

      * {
        font-family: "Mulish", san-serif;
      }

      .btn-close {
        &&&:focus {
          box-shadow: none;
        }
      }
    `}
  />
);

export default GlobalStyle;
