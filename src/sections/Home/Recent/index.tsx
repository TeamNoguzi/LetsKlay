import { useMemo } from "react";
import { FindProjectResponseDto } from "@/dto";
import { Row } from "react-bootstrap";
import Carousel from "stories/Carousel";
import FundCard from "stories/Cards/FundCard";
import { between, down } from "styled-breakpoints";
import { useBreakpoint } from "styled-breakpoints/react-emotion";
import { useRouter } from "next/router";
import * as S from "./styled";

interface HomeRecentProps {
  projects: FindProjectResponseDto[];
}

const HomeRecent = ({ projects }: HomeRecentProps) => {
  const router = useRouter();
  const isXs = useBreakpoint(down("sm"));
  const isSm = useBreakpoint(between("sm", "md"));
  const isMd = useBreakpoint(between("md", "lg"));
  const isLg = useBreakpoint(between("lg", "xl"));
  const isXl = useBreakpoint(between("xl", "xxl"));

  const CarouselWidth = (() => {
    if (isXs) return 280;
    if (isSm) return 400;
    if (isMd) return 670;
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
        large
        key={project.id}
        imgSrc={project.thumbnailUrl}
        project={project}
        onClick={() => handleClickCard(project.id)}
      />
    ));
  }, [projects, router]);

  return (
    <Row>
      <S.RecentTitle>Recently begined projects</S.RecentTitle>
      <Carousel
        gap={45}
        itemWidth={270}
        count={projects.length}
        division={isSm || isXs ? projects.length : 3}
        width={CarouselWidth}
      >
        {FundCards}
      </Carousel>
    </Row>
  );
};

export default HomeRecent;
