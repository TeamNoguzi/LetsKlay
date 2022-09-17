import { useState, useMemo, useCallback, Suspense } from "react";
import Stepper from "sections/Projects/Modify/Stepper";
import { Container, Row, Col, Placeholder } from "react-bootstrap";
import Logo from "stories/Logo";
import Navigation from "stories/Layout/Navigation";
import Footer from "stories/Layout/Footer";
import { GetServerSidePropsContext } from "next";
import { fetchProjectWithId } from "api";
import { FindProjectFullResponseDto } from "@/dto";
import { useProject } from "hooks/queries/useProjects";
import dynamic from "next/dynamic";
import * as S from "./styled";

interface ProjectModifyProps {
  projectId: number;
  initialProject: FindProjectFullResponseDto;
}

const DynamicFormBasics = dynamic(() => import("sections/Projects/Modify/Form/Basics"), {
  suspense: true,
});
const DynamicFormPictures = dynamic(() => import("sections/Projects/Modify/Form/Pictures"), {
  suspense: true,
});
const DynamicFormDescriptions = dynamic(
  () => import("sections/Projects/Modify/Form/Descriptions"),
  {
    ssr: false,
  }
);

const ProjectModify = ({ projectId, initialProject }: ProjectModifyProps) => {
  const [selected, setSelected] = useState<number>(0);
  const handleSelect = useCallback((idx: number) => setSelected(idx), []);
  const { project } = useProject(projectId, initialProject);

  const steps = useMemo(
    () => [
      <>
        <S.Circle>1</S.Circle>
        Basics
      </>,
      <>
        <S.Circle>2</S.Circle>
        Pictures
      </>,
      <>
        <S.Circle>3</S.Circle>
        Descriptions
      </>,
      <>
        <S.Circle>4</S.Circle>
        Rewards
      </>,
    ],
    []
  );

  const Pages = useMemo(
    () => [
      <DynamicFormBasics project={project} />,
      <DynamicFormPictures project={project} />,
      <DynamicFormDescriptions project={project} />,
    ],
    [project]
  );

  return (
    <Container>
      <header>
        <Logo center />
        <Navigation />
      </header>
      <Row className="mt-4">
        <Col xs={12} md={4} lg={3} xl={2} as="nav">
          <Stepper steps={steps} selected={selected} onClickItem={handleSelect} />
        </Col>
        <Col xs={12} md={8} lg={9} xl={10}>
          <Suspense
            fallback={
              <>
                <Placeholder as="p" animation="wave">
                  <Placeholder xs={4} />
                </Placeholder>
                <Placeholder as="p" animation="wave">
                  <Placeholder xs={12} />
                </Placeholder>
                <Placeholder as="p" animation="wave">
                  <Placeholder xs={12} />
                </Placeholder>
              </>
            }
          >
            {Pages[selected]}
          </Suspense>
        </Col>
      </Row>
      <footer>
        <Footer />
      </footer>
    </Container>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const projectId = context.query.id;
  if (!projectId) {
    context.res.statusCode = 404;
    return { notFound: true };
  }

  const project = await fetchProjectWithId(+projectId);
  if (!project) {
    context.res.statusCode = 404;
    return { notFound: true };
  }

  return { props: { projectId, initialProject: project } };
}

export default ProjectModify;
