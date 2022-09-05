import styled from "@emotion/styled";
import { Container as BsContainer } from "react-bootstrap";

const Container = styled(BsContainer)`
  & > .row {
    margin-top: 35px;
  }
`;

const Divider = styled.hr``;

export { Container, Divider };
