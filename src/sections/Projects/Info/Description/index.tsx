import { Row, Col, Tabs, Tab } from "react-bootstrap";
import { FindProjectFullResponseDto } from "@/dto";
import { useBreakpoint } from "styled-breakpoints/react-emotion";
import { down } from "styled-breakpoints";
import ReactMarkdown from "react-markdown";
import ProjectRewards from "../Rewards";
import * as S from "./styled";

interface ProjectDescriptionProps {
  project: FindProjectFullResponseDto;
}

const ProjectDescription = ({ project }: ProjectDescriptionProps) => {
  const isMobile = useBreakpoint(down("lg"));
  return (
    <Row>
      <Col xs={12} lg={8} xl={9}>
        <S.TabsWrapper>
          <Tabs defaultActiveKey="Description">
            <Tab eventKey="Description" title="Description" className="py-3">
              <ReactMarkdown css={S.markdownStyle}>{project.description}</ReactMarkdown>
            </Tab>
            {isMobile && (
              <Tab eventKey="Reward" title="Reward">
                <ProjectRewards projectId={project.id} rewards={project.rewards} />
              </Tab>
            )}
            <Tab eventKey="Policy" title="Policy" className="py-3">
              <h5>Funding</h5>
              <ol>
                <li>
                  Funding could be done with KLAY. You have to download the wallet from chrome
                  marketplace and create account.
                </li>
                <li>
                  This website does not sell KLAY. You have to buy it from other sellers or
                  marketplaces.
                </li>
              </ol>
              <h5>Refund</h5>
              <ol>
                <li>
                  You cannot request refund on this website after the project funding is ended,
                  unless the project owner violates the policy.
                </li>
                <li>
                  It might take several days to handle the refund request, since the project owner
                  have to inspect the reward.
                </li>
              </ol>
              <h5>Communication</h5>
              <ol>
                <li>Please do not be offensive to other users.</li>
              </ol>
            </Tab>
            <Tab eventKey="Commnunity" title="Community" className="py-3">
              <div style={{ height: "200vh" }} />
            </Tab>
          </Tabs>
        </S.TabsWrapper>
      </Col>
      <Col lg={4} xl={3} className="d-none d-lg-flex mt-lg-5">
        <ProjectRewards projectId={project.id} rewards={project.rewards} />
      </Col>
    </Row>
  );
};

export default ProjectDescription;
