import { useState, useMemo, useCallback, Suspense } from "react";
import Stepper from "sections/Projects/Modify/Stepper";
import { Container, Row, Col, Placeholder } from "react-bootstrap";
import Logo from "stories/Logo";
import Navigation from "stories/Layout/Navigation";
import Footer from "stories/Layout/Footer";
import { GetServerSidePropsContext } from "next";
import { fetchProjectWithId, updateProjectPublic, verifySession } from "api";
import { FindProjectFullResponseDto } from "@/dto";
import { useProject } from "hooks/queries/useProjects";
import dynamic from "next/dynamic";
import Button from "stories/Buttons/Button";
import { ProjectStatus } from "@/enums";
import { useRouter } from "next/router";
import { useAuthGuard } from "hooks";
import FactoryABI from "@/klaytn/build/contracts/Factory.json";
import { AbiItem } from "caver-js";
import { sendTransaction } from "utils/transactions";
import { css } from "@emotion/react";
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

  const handleUpdatePublic = async () => {
    await verifySessionGuarded(undefined);
    await sendTransaction(
      {
        abi: FactoryABI.abi as AbiItem[],
        address: process.env.FACTORY_ADDR ?? "",
        method: "createProject",
      },
      project.rewards.map((reward) => reward.id),
      project.rewards.map((reward) => reward.price),
      project.fundGoal,
      +project.id
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

      <Footer />
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
  if (project.status !== ProjectStatus.preparing) {
    context.res.statusCode = 405;
    return { redirect: { destination: `/projects/${projectId}` } };
  }

  return { props: { initialProject: project } };
}

export default ProjectModify;
