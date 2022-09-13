import { Row, Col, Tabs, Tab } from "react-bootstrap";
import { Project } from "@/entities/projects";
import { useBreakpoint } from "styled-breakpoints/react-emotion";
import { down } from "styled-breakpoints";
import ProjectRewards from "../Rewards";
import * as S from "./styled";

interface ProjectDescriptionProps {
  project: Project;
}

const ProjectDescription = ({ project }: ProjectDescriptionProps) => {
  const isMobile = useBreakpoint(down("lg"));
  return (
    <Row>
      <Col xs={12} lg={8} xl={9}>
        <S.TabsWrapper>
          <Tabs defaultActiveKey="Description">
            <Tab eventKey="Description" title="Description">
              {project.description}
            </Tab>
            {isMobile && (
              <Tab eventKey="Reward" title="Reward">
                <ProjectRewards rewards={project.rewards} />
              </Tab>
            )}
            <Tab eventKey="Policy" title="Policy">
              <div style={{ height: "200vh" }} />
            </Tab>
            <Tab eventKey="Commnunity" title="Community">
              <div style={{ height: "200vh" }} />
            </Tab>
          </Tabs>
        </S.TabsWrapper>
      </Col>
      <Col lg={4} xl={3} className="d-none d-lg-flex mt-lg-5">
        <ProjectRewards rewards={project.rewards} />
      </Col>
    </Row>
  );
};

export default ProjectDescription;
