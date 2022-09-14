import { Project } from "@/entities";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchProjectWithId, createProject, updateProject } from "api";
import queryClient from "./client";

interface CreateProjectMutationParam {
  project?: Project;
}

interface UpdateProjectMutationParam {
  project: Project;
}

const useProject = (projectId: number, initialData: Project) => {
  const { data, isError } = useQuery(["projects", projectId], () => fetchProjectWithId(projectId), {
    initialData,
  });

  return { project: data, isError };
};

const useProjectsCreateMutation = () => {
  const mutation = useMutation<unknown, unknown, CreateProjectMutationParam>(({ project }) =>
    createProject(project)
  );

  return mutation;
};

const useProjectsUpdateMutation = () => {
  const mutation = useMutation<unknown, unknown, UpdateProjectMutationParam>(
    ({ project }) => updateProject(project.id, project),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["projects"]);
      },
    }
  );

  return mutation;
};

export { useProject, useProjectsCreateMutation, useProjectsUpdateMutation };