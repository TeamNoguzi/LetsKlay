import styled from "@emotion/styled";
import { flexBox } from "styles/mixins";

const LikedListContainer = styled.div`
  ${flexBox({ direction: "column" })};

  width: 100%;
  margin-top: 20px;

  & > * {
    padding: 20px 0;
    &:not(:last-child) {
      border-bottom: 1px solid #3c3c3c20;
    }
  }
`;

const PaginationWrapper = styled.div`
  ${flexBox({ direction: "row", middle: true })};
`;

export { LikedListContainer, PaginationWrapper };
