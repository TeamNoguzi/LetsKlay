import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { flexBox } from "styles/mixins";

const FormTitle = styled.h2`
  font-weight: bold;
  font-size: 18pt;
`;

const FormSubtitle = styled.h3`
  font-weight: bold;
  font-size: 16pt;
`;

const FormDescription = styled.p`
  margin-top: 10px;
  margin-bottom: 20px;
`;

const RewardToggle = styled.div`
  ${flexBox({ direction: "column", middle: false })};
  justify-content: center;

  height: 50px;
  width: 100%;

  padding: 10px;

  background-color: ${(props) => props.theme.colors.primary}40;
`;

const collapseStyle = css`
  &.collapse:not(.show) {
    display: block;
    opacity: 0;
    max-height: 0;
    overflow: hidden;
  }
`;

export { FormTitle, FormSubtitle, FormDescription, RewardToggle, collapseStyle };
