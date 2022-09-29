import styled from "@emotion/styled";
import { Container, Row } from "react-bootstrap";
import { flexBox } from "styles/mixins";

const FundListContainer = styled(Container)`
  ${flexBox({ direction: "column" })};
  align-items: center;
  width: 100%;

  overflow: hidden;
  text-overflow: ellipsis;

  & > div:not(:last-child) {
    border-bottom: 1px solid #3c3c3c20;
  }
`;

const FundItem = styled(Row)`
  width: 100%;
  margin: 0;

  img {
    min-height: 120px;
    width: 100%;
    cursor: pointer;
  }
`;

const FundItemDescription = styled.div`
  h5 {
    font-size: 14pt;
    color: ${(props) => props.theme.colors.blackLight};
    font-weight: bold;
  }
  p {
  }
  span {
    display: block;
    font-size: 11pt;
  }
`;

const FundPaginationWrapper = styled.div`
  margin-top: 20px;
`;

export { FundListContainer, FundItem, FundItemDescription, FundPaginationWrapper };
