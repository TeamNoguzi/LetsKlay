import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { flexBox } from "styles/mixins";

interface LogoTextProps {
  center?: boolean;
}

const LogoText = styled.div<LogoTextProps>`
  font-size: 32pt;
  color: ${(props) => props.theme.colors.primary};
  cursor: pointer;

  width: fit-content;

  ${(props) =>
    props.center &&
    css`
      ${flexBox({ direction: "column", middle: true })}
      width: 100%;
      margin: 5px 0;
    `}
`;

export { LogoText };
