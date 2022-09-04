import { Project } from "@/entities/projects";
import { fetchProjectWithId } from "api";
import { GetServerSidePropsContext } from "next";
import ProjectIntro from "sections/Projects/Intro";

interface ProjectDetailPageProps {
  project: Project;
}

const ProjectDetail = ({ project }: ProjectDetailPageProps) => {
  return <ProjectIntro project={project} />;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  if (!context.params?.id) {
    context.res.statusCode = 404;
    return {};
  }
  const project = await fetchProjectWithId(+context.params.id);
  return {
    props: { project },
  };
}

export default ProjectDetail;
