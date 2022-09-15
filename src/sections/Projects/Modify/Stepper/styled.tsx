import styled from "@emotion/styled";
import { flexBox } from "styles/mixins";
import { css } from "@emotion/react";

interface StepperItemProps {
  selected?: boolean;
}

const StepperTitle = styled.h6`
  padding-left: 20px;
  margin-bottom: 20px;

  color: ${(props) => props.theme.colors.secondaryBold};
  font-size: 18pt;
  font-weight: bold;
  line-height: 18pt;
  vertical-align: middle;
`;

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

export { StepperTitle, StepperContainer, StepperItem };
