import styled from "@emotion/styled";
import { flexBox } from "styles/mixins";

const RankingTitle = styled.h6`
  padding-left: 5px;
  margin: 0;

  color: ${(props) => props.theme.colors.secondaryBold};
  font-weight: bold;
`;

const RankingWrapper = styled.div`
  ${flexBox({ direction: "column", middle: true })};
  height: 100%;
`;

export { RankingTitle, RankingWrapper };
