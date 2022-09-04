import { Project } from "@/entities/projects";
import { Container, Row, Col, ProgressBar } from "react-bootstrap";
import Image from "next/image";
import numeral from "numeral";
import Button from "stories/Buttons/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useLikes, useIsLiked, useToggleLikes } from "hooks";
import * as S from "./styled";

interface ProjectIntroProps {
  project: Project;
}

const ProjectIntro = ({ project }: ProjectIntroProps) => {
  const { likes } = useLikes(project.id);
  const { isLiked } = useIsLiked(project.id);
  const toggleLikes = useToggleLikes(project.id, isLiked);

  const progress = project.fundNow / project.fundGoal;

  return (
    <Container>
      <Row>
        <Col xs={8}>
          <S.ImageWrapper>
            <Image src="/Landscape-Color.jpg" layout="fill" objectFit="cover" />
          </S.ImageWrapper>
        </Col>
        <Col xs={4}>
          <S.ProjectSummary>
            <S.ProjectText>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
            </S.ProjectText>
            <S.ProjectGoal>
              <h2>{numeral(project.fundNow).format("$0,0")}</h2>
              <ProgressBar now={progress} />
              <span>
                {progress}% of {numeral(project.fundGoal).format("$0,0")}
              </span>
              <span style={{ float: "right" }}> supports</span>
            </S.ProjectGoal>
            <Button variant="outline" onClick={() => toggleLikes.mutate()}>
              <FontAwesomeIcon icon={faHeart} />
              {` ${likes?.length ?? 0}`}
            </Button>
          </S.ProjectSummary>
        </Col>
      </Row>
    </Container>
  );
};

export default ProjectIntro;
