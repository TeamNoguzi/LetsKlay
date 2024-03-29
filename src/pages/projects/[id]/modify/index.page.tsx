import { useState, useMemo, useCallback, Suspense } from "react";
import Stepper from "sections/Projects/Modify/Stepper";
import { Container, Row, Col, Placeholder } from "react-bootstrap";
import Header from "stories/Layout/Header";
import Footer from "stories/Layout/Footer";
import { GetServerSidePropsContext } from "next";
import { fetchProjectWithId, updateProjectPublic, verifySession } from "api";
import { FindProjectFullResponseDto } from "@/dto";
import { useProject, useAuthGuard, useTransaction } from "hooks";
import dynamic from "next/dynamic";
import Button from "stories/Buttons/Button";
import { ProjectStatus } from "@/enums";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import blockUnauthorized from "utils/blockUnauthorized";
import { createProject } from "transactions";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import * as S from "./styled";

interface ProjectModifyProps {
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
const DynamicFormRewards = dynamic(() => import("sections/Projects/Modify/Form/Rewards"), {
  suspense: true,
});

const ProjectModify = ({ initialProject }: ProjectModifyProps) => {
  const router = useRouter();
  const [selected, setSelected] = useState<number>(0);
  const handleSelect = useCallback((idx: number) => setSelected(idx), []);
  const { project } = useProject(initialProject);
  const verifySessionGuarded = useAuthGuard(verifySession);
  const createProjectTransaction = useTransaction(createProject);

  const handleUpdatePublic = async () => {
    await verifySessionGuarded(undefined);
    await createProjectTransaction(
      {
        rewards: project.rewards,
        projectId: project.id,
        fundGoal: project.fundGoal,
      },
      { title: "Project published!", body: "The project is successfully published!", icon: faCheck }
    );
    await updateProjectPublic(project.id)
      .then(() => router.push(`/projects/${project.id}`))
      .catch(() => {});
  };

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

  const sections = useMemo(
    () => [
      <DynamicFormBasics project={project} />,
      <DynamicFormPictures project={project} />,
      <DynamicFormDescriptions project={project} />,
      <DynamicFormRewards project={project} />,
    ],
    [project]
  );

  return (
    <>
      <Header />
      <Container as="main">
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
              {sections[selected]}
            </Suspense>

            <hr />
            <Button
              type="button"
              variant="outline"
              css={css`
                margin-right: 10px;
              `}
              onClick={() => router.push(`/projects/${project.id}`)}
            >
              Preview
            </Button>
            <Button type="button" variant="primary" onClick={handleUpdatePublic}>
              Open to Public
            </Button>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const isAuthorized = await blockUnauthorized(context);

  if (!isAuthorized) {
    return {
      redirect: { destination: `/login?prevPage=${context.resolvedUrl}`, permanent: false },
    };
  }

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
  if (project.status !== ProjectStatus.preparing) {
    context.res.statusCode = 405;
    return { redirect: { destination: `/projects/${projectId}` } };
  }

  return { props: { initialProject: project } };
}

export default ProjectModify;
