import styled from "@emotion/styled";
import { down } from "styled-breakpoints";
import { flexBox } from "styles/mixins";

const MyProjectsContainer = styled.div`
  ${flexBox({ direction: "row" })};

  flex-wrap: wrap;
  gap: 50px 35px;

  width: 100%;

  margin-top: 30px;

  ${down("md")} {
    justify-content: center;
  }
`;

const CardWrapper = styled.div`
  ${flexBox({ direction: "column" })}
`;

const ButtonGroup = styled.div`
  ${flexBox({ direction: "row", middle: true })};
  gap: 0 10px;
  margin-top: 15px;
`;

export { MyProjectsContainer, CardWrapper, ButtonGroup };
