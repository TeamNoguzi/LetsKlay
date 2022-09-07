import { Card, ProgressBar } from "react-bootstrap";
import { Project } from "@/entities";
import Image from "next/image";
import numeral from "numeral";
import * as S from "./styled";

interface FundCardProps {
  project: Project;
  width?: number;
  onClick?: () => void;
}

const FundCard = ({ project, width, onClick }: FundCardProps) => {
  const progress = project.fundNow / project.fundGoal;
  return (
    <S.FundCard width={width} onClick={onClick}>
      <S.FundImageWrapper>
        <Image src="/Landscape-Color.jpg" layout="fill" objectFit="cover" />
      </S.FundImageWrapper>
      <S.FundCardBody>
        <Card.Title>{project.title}</Card.Title>
        <S.FundCardSubtitle>{project.subtitle}</S.FundCardSubtitle>
        <S.FundCardText>{project.summary}</S.FundCardText>

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