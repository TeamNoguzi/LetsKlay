import { useMemo } from "react";
import { FindProjectResponseDto } from "@/dto";
import { Row } from "react-bootstrap";
import Carousel from "stories/Carousel";
import FundCard from "stories/Cards/FundCard";
import { between } from "styled-breakpoints";
import { useBreakpoint } from "styled-breakpoints/react-emotion";
import { useRouter } from "next/router";
import * as S from "./styled";

interface HomeRecentProps {
  projects: FindProjectResponseDto[];
}

const HomeRecent = ({ projects }: HomeRecentProps) => {
  const router = useRouter();
  const isMd = useBreakpoint(between("md", "lg"));
  const isLg = useBreakpoint(between("lg", "xl"));
  const isXl = useBreakpoint(between("xl", "xxl"));

  const CarouselWidth = (() => {
    if (isMd) return 700;
    if (isLg) return 900;
    if (isXl) return 1000;
    return 1200;
  })();

  const FundCards = useMemo(() => {
    const handleClickCard = (id: number) => {
      router.push(`/projects/${id}`);
    };
    return projects.map((project) => (
      <FundCard
        key={project.id}
        project={project}
        width={270}
        onClick={() => handleClickCard(project.id)}
      />
    ));
  }, [projects, router]);

  return (
    <Row>
      <S.RecentTitle>Recently begined projects</S.RecentTitle>
      <Carousel gap={45} itemWidth={270} count={projects.length} division={3} width={CarouselWidth}>
        {FundCards}
      </Carousel>
    </Row>
  );
};

export default HomeRecent;
