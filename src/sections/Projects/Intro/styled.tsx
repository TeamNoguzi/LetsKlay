import styled from "@emotion/styled";
import { down } from "styled-breakpoints";
import { ellipsis, flexBox } from "styles/mixins";

const ProjectSummary = styled.div`
  display: flex;
  flex-direction: column;

  height: 480px;
  padding: 20px 0;
`;

const ProjectText = styled.div`
  max-height: 300px;
  margin-bottom: auto;

  h2 {
    margin-bottom: 25px;
  }
  p {
    ${ellipsis({ line: 8, lineHeight: 14 })};
  }
`;

const ProjectGoal = styled.div`
  margin-bottom: 15px;
  h2 {
    font-weight: bolder;
    margin-bottom: 10px;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 450px;

  & > img {
    object-fit: cover;
    max-height: 100%;
    width: 100%;
  }

  ${down("md")} {
    height: 270px;
  }
`;

const ButtonGroups = styled.div`
  ${flexBox({ direction: "row", middle: true })};
  gap: 0 20px;
  width: 100%;

  & > button:first-of-type {
    width: 100%;
    height: 50px;
    font-weight: bold;
  }
`;

const IconGroups = styled.div`
  ${flexBox({ direction: "row", middle: true })};
  gap: 0 5px;
`;

export { ProjectSummary, ProjectText, ProjectGoal, ImageWrapper, ButtonGroups, IconGroups };
