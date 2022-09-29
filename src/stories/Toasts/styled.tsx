import { css } from "@emotion/react";
import { down } from "styled-breakpoints";

const ToastContainerStyle = css`
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 1000;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  max-height: 415px;
  overflow: hidden;

  ${down("md")} {
    right: 0px;
    width: 100%;
    align-items: center;
  }
`;

export { ToastContainerStyle };
