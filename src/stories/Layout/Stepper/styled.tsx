import styled from "@emotion/styled";
import { flexBox } from "styles/mixins";
import { css } from "@emotion/react";

interface StepperItemProps {
  selected?: boolean;
}

const StepperContainer = styled.div`
  ${flexBox({ direction: "column", middle: true })};

  width: 100%;
`;

const StepperItem = styled.div<StepperItemProps>`
  ${flexBox({ direction: "row", middle: true })};
  justify-content: flex-start;
  gap: 0 15px;
  width: 100%;
  height: 60px;

  padding-left: 20px;
  border-left: 4px solid white;

  cursor: pointer;

  ${(props) =>
    props.selected &&
    css`
      border-left: 4px solid ${props.theme.colors.secondary};
      border-right: none;
      margin: 15px 0;
    `}
`;

export { StepperContainer, StepperItem };
