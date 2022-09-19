import { FindProjectFullResponseDto } from "@/dto";
import { fetchProjectWithId } from "api";
import { GetServerSidePropsContext } from "next";
import { Row } from "react-bootstrap";
import Logo from "stories/Logo";
import Navigation from "stories/Layout/Navigation";
import ProjectIntro from "sections/Projects/Intro";
import ProjectDescription from "sections/Projects/Info/Description";
import Footer from "stories/Layout/Footer";
import * as S from "./styled";

interface ProjectDetailPageProps {
  project: FindProjectFullResponseDto;
}

const ProjectDetail = ({ project }: ProjectDetailPageProps) => {
  return (
    <S.Container>
      <Logo center />
      <Navigation />
      <ProjectIntro project={project} />
      <Row>
        <S.Divider />
      </Row>
      <ProjectDescription project={project} />
      <Footer />
    </S.Container>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  if (!context.params?.id) {
    return { notFound: true };
  }
  const project = await fetchProjectWithId(+context.params.id);
  return {
    props: { project },
  };
}

export default ProjectDetail;
