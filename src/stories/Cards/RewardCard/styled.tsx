import styled from "@emotion/styled";
import { flexBox } from "styles/mixins";

const RewardCard = styled.div`
  position: relative;

  width: 100%;
  max-width: 350px;

  padding: 20px;
  border: 1px solid ${(props) => props.theme.colors.blackLight}20;

  h1 {
    margin-bottom: 15px;
    font-weight: bolder;
    font-size: 20pt;
  }

  h2 {
    font-size: 18pt;
  }

  p {
    margin-top: 0;
    color: #2c2c2cf0;

    &:last-child {
      margin: 0;
    }
  }
`;

const RewardCardMask = styled.div`
  ${flexBox({ direction: "column", middle: true })};
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  z-index: 1;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.primaryLight};
  opacity: 0;
  transition: 0.1s linear;

  color: ${(props) => props.theme.colors.secondaryBold};
  font-size: 20pt;
  font-weight: bold;

  &:hover {
    opacity: 0.75;
  }
`;

const RewardCardZeroMask = styled(RewardCardMask)`
  background-color: ${(props) => props.theme.colors.blackLight}a0;
  color: ${(props) => props.theme.colors.primaryLight};
`;

const Label = styled.div`
  font-size: 11pt;
  color: #2c2c2cb0;
`;

export { RewardCard, RewardCardMask, RewardCardZeroMask, Label };
