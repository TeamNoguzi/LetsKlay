import { Global, css } from "@emotion/react";
// import Mulish from "public/fonts/Mulish/Mulish-VariableFont_wght.ttf";
// import MulishItalic from "public/fonts/Mulish/Mulish-Italic-VariableFont_wght.ttf";
import theme from "./theme";

const GlobalStyle = () => (
  <Global
    styles={css`
      @font-face {
        font-family: "Mulish";
        src: url("/fonts/Mulish/Mulish-VariableFont_wght.ttf");
      }
      @font-face {
        font-family: "Mulish";
        font-style: italic;
        src: url("/fonts/Mulish/Mulish-Italic-VariableFont_wght.ttf");
      }

      * {
        font-family: "Mulish", san-serif;
      }

      .btn,
      .btn-close,
      .page-link {
        &&&:focus {
          box-shadow: none;
        }
      }

      .form-control,
      .form-select,
      .form-check-input {
        &&&:focus {
          box-shadow: none;
          border-color: ${theme.colors.secondary};
        }
      }

      .form-check-input:checked {
        border-color: ${theme.colors.secondary};
        background-color: ${theme.colors.secondary};
      }

      .form-label {
        font-size: 10pt;
        color: #808080;
        margin-bottom: 5px;
      }
    `}
  />
);

export default GlobalStyle;
