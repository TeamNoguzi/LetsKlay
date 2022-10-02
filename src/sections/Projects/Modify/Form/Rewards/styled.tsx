import styled from "@emotion/styled";
import { Col, Collapse } from "react-bootstrap";
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
  ${flexBox({ direction: "row", middle: false })};
  align-items: center;

  height: 50px;
  width: 100%;

  padding: 10px;

  background-color: ${(props) => props.theme.colors.primary}40;

  span {
    display: inline-block;
    margin-right: auto;
  }
`;

const RewardCollapse = styled(Collapse)`
  &.collapse:not(.show) {
    display: block;
    opacity: 0;
    max-height: 0;
    overflow: hidden;
  }
`;

const RewardCardCol = styled(Col)`
  ${flexBox({ direction: "column", middle: true })};
`;

export { FormTitle, FormSubtitle, FormDescription, RewardToggle, RewardCardCol, RewardCollapse };
