import styled from "@emotion/styled";
import { flexBox } from "styles/mixins";

interface IconButtonContainerProps {
  width: number;
}

const IconButtonContainer = styled.div<IconButtonContainerProps>`
  ${flexBox({ direction: "column", middle: true })};

  width: ${(props) => props.width}px;
  height: ${(props) => props.width}px;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.1s linear;

  &:hover {
    background-color: ${(props) => props.theme.colors.primaryLight}a0;
  }
`;

export { IconButtonContainer };
