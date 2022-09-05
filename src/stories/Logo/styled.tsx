import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { flexBox } from "styles/mixins";

interface LogoTextProps {
  center?: boolean;
  fontSize?: number;
}

const LogoText = styled.div<LogoTextProps>`
  width: fit-content;
  font-size: ${(props) => props.fontSize ?? 28}pt;

  & > a {
    text-decoration: none;
    color: ${(props) => props.theme.colors.primary};
  }

  ${(props) =>
    props.center &&
    css`
      ${flexBox({ direction: "column", middle: true })}
      width: 100%;
      margin: 5px 0;
    `}
`;

export { LogoText };
