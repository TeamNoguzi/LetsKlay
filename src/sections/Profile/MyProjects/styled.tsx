import styled from "@emotion/styled";
import { down } from "styled-breakpoints";
import { flexBox } from "styles/mixins";

const MyProjectsContainer = styled.div`
  ${flexBox({ direction: "row" })};
  justify-content: center;

  flex-wrap: wrap;
  gap: 0px 35px;

  width: 100%;
`;

const DropdownWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 20px;
`;

const CardWrapper = styled.div`
  ${flexBox({ direction: "column" })};
  padding: 20px 0;

  ${down("md")} {
    ${flexBox({ direction: "row" })};
    width: 100%;
    border-bottom: 1px solid #3c3c3c20;
  }
`;

const ButtonGroup = styled.div`
  ${flexBox({ direction: "row", middle: true })};
  gap: 0 10px;
  margin-top: 15px;
`;

const PaginationWrapper = styled.div`
  ${flexBox({ direction: "row", middle: true })};
  width: 100%;
`;

export { MyProjectsContainer, DropdownWrapper, CardWrapper, ButtonGroup, PaginationWrapper };
