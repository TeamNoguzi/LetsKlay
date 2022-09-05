import styled from "@emotion/styled";
import { flexBox } from "styles/mixins";

const RewardsContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Slider = styled.div`
  ${flexBox({ direction: "column", middle: false })};
  align-items: center;

  position: sticky;
  top: 30px;

  & > *:not(:last-child) {
    margin-bottom: 20px;
  }
`;

export { RewardsContainer, Slider };
