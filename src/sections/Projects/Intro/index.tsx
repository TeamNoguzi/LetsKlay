import { IconButton } from "stories/Buttons/IconButton";
import { faFacebookSquare, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FindProjectFullResponseDto } from "@/dto";
import { Row, Col, ProgressBar } from "react-bootstrap";
import Image from "next/image";
import numeral from "numeral";
import Button from "stories/Buttons/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useLikes, useIsLiked, useToggleLikesMutation } from "hooks";
import * as S from "./styled";

interface ProjectIntroProps {
  project: FindProjectFullResponseDto;
}

const ProjectIntro = ({ project }: ProjectIntroProps) => {
  const { likes } = useLikes(project.id);
  const { isLiked } = useIsLiked(project.id);
  const toggleLikesMutation = useToggleLikesMutation();

  const progress = project.fundNow / project.fundGoal;

  return (
    <Row>
      <Col xs={12} lg={8}>
        <S.ImageWrapper>
          <Image src="/Landscape-Color.jpg" layout="fill" objectFit="cover" />
        </S.ImageWrapper>
      </Col>
      <Col xs={12} lg={4}>
        <S.ProjectSummary>
          <S.ProjectText>
            <h2>{project.title}</h2>
            <p>{project.summary}</p>
          </S.ProjectText>
          <S.ProjectGoal>
            <h2>{numeral(project.fundNow).format("0,0")} KLAY</h2>
            <ProgressBar now={progress * 100} />
            <span>
              {numeral(progress).format("0.0%")} of {numeral(project.fundGoal).format("0,0")} KLAY
            </span>
          </S.ProjectGoal>
          <S.ButtonGroups>
            <Button
              variant="outline"
              onClick={() => toggleLikesMutation.mutate({ isLiked, projectId: project.id })}
            >
              <FontAwesomeIcon icon={faHeart} />
              {` ${likes?.length ?? 0}`}
            </Button>
            <S.IconGroups>
              <IconButton icon={faFacebookSquare} width={36} fontSize={24} />
              <IconButton icon={faInstagram} width={36} fontSize={24} />
              <IconButton icon={faTwitter} width={36} fontSize={24} />
            </S.IconGroups>
          </S.ButtonGroups>
        </S.ProjectSummary>
      </Col>
    </Row>
  );
};

export default ProjectIntro;
