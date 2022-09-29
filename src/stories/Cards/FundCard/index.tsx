import { Card, ProgressBar } from "react-bootstrap";
import { FindProjectResponseDto } from "@/dto";
import numeral from "numeral";
import * as S from "./styled";

interface FundCardProps {
  large?: boolean;
  imgSrc: string;
  project: FindProjectResponseDto;
  onClick?: () => void;
}

const FundCard = ({ large = false, imgSrc, project, onClick }: FundCardProps) => {
  const progress = project.fundNow / project.fundGoal;

  return (
    <S.FundCard large={large} onClick={onClick}>
      <S.FundImageWrapper large={large}>
        <img src={imgSrc} alt="fund item thumbnail" loading="lazy" />
      </S.FundImageWrapper>
      <S.FundCardBody large={large}>
        <Card.Title>{project.title}</Card.Title>
        <S.FundCardSubtitle>{project.subtitle}</S.FundCardSubtitle>
        <S.FundCardText large={large}>{project.summary}</S.FundCardText>

        <span>{numeral(project.fundNow).format("$0,0")}</span>
        <span style={{ float: "right" }}>{`${numeral(progress).format("0%")} of ${numeral(
          project.fundGoal
        ).format("$0,0")}`}</span>
        <ProgressBar now={progress} max={1} />
      </S.FundCardBody>
    </S.FundCard>
  );
};

export default FundCard;
