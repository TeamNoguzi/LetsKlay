import { css } from "@emotion/react";

interface FlexBoxProps {
  direction: "row" | "column";
  middle?: boolean;
}

const flexBox = ({ direction, middle = false }: FlexBoxProps) => {
  return css`
    display: flex;
    flex-direction: ${direction};
    ${middle &&
    css`
      justify-content: center;
      align-items: center;
    `}
  `;
};

export { flexBox };
