import styled from "@emotion/styled";
import { ellipsis } from "styles/mixins";

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
    ${ellipsis({ line: 8, lineHeight: 14 })}
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
  height: 100%;
`;

export { ProjectSummary, ProjectText, ProjectGoal, ImageWrapper };
