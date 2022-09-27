import { FindProjectResponseDto } from "@/dto";
import { Row, Col } from "react-bootstrap";
import ItemCard from "stories/Cards/ItemCard";
import { useRouter } from "next/router";
import { useBreakpoint } from "styled-breakpoints/react-emotion";
import { down } from "styled-breakpoints";
import * as S from "./styled";

interface HomeMainProps {
  projects: FindProjectResponseDto[];
}

const HomeMain = ({ projects }: HomeMainProps) => {
  const isMobile = useBreakpoint(down("lg"));
  const router = useRouter();
  const bannerProject = projects[0];

  const handleClickItem = (id: number) => {
    router.push(`/projects/${id}`);
  };

  return (
    <Row>
      <Col className="mb-3" xs={12} lg={8}>
        {bannerProject && (
          <ItemCard
            imgSrc={bannerProject.thumbnailUrl}
            imageHeight={isMobile ? 250 : 400}
            large
            title={bannerProject.title}
            body={bannerProject.subtitle}
            onClick={() => handleClickItem(bannerProject.id)}
          />
        )}
      </Col>
      <Col xs={12} lg={4}>
        <S.RankingTitle>Top funding projects</S.RankingTitle>
        <S.RankingWrapper>
          {projects.slice(0, 4).map((project) => (
            <ItemCard
              className="mb-3"
              key={project.id}
              imgSrc={project.thumbnailUrl}
              imageHeight={100}
              title={project.title}
              body={project.subtitle}
              onClick={() => handleClickItem(project.id)}
            />
          ))}
        </S.RankingWrapper>
      </Col>
    </Row>
  );
};

export default HomeMain;
