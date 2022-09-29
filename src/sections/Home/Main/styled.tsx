import styled from "@emotion/styled";
import { flexBox } from "styles/mixins";

const RankingTitle = styled.h6`
  padding-left: 5px;
  margin: 0;

  color: ${(props) => props.theme.colors.secondaryBold};
  font-weight: bold;
`;

const RankingWrapper = styled.div`
  ${flexBox({ direction: "column" })};

  height: 100%;
  margin-top: 10px;

  &&& > *:not(:last-child) {
    padding: 5px 0;
    border-bottom: 1px solid #3c3c3c20;
  }
`;

export { RankingTitle, RankingWrapper };
