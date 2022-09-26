import styled from "@emotion/styled";
import { Pagination } from "react-bootstrap";

const PaginationWrapper = styled(Pagination)`
  .page-item {
    .page-link {
      width: 32px;
      height: 32px;

      padding: 0;
      border: 1px solid ${(props) => props.theme.colors.secondaryLight}a0;
      border-radius: 50%;
      overflow: hidden;

      line-height: 32px;
      vertical-align: middle;
      text-align: center;
      color: ${(props) => props.theme.colors.secondaryBold};
    }

    &.active {
      .page-link {
        background-color: ${(props) => props.theme.colors.secondary};
        color: white;
      }
    }
  }
`;

export { PaginationWrapper };
