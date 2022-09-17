import { CreateProjectDto, FindProjectFullResponseDto, UpdateProjectDto } from "@/dto";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchProjectWithId, createProject, updateProject } from "api";
import queryClient from "./client";

interface CreateProjectMutationParam {
  project?: CreateProjectDto;
}

interface UpdateProjectMutationParam {
  project: UpdateProjectDto & { id: number };
}

const useProject = (projectId: number, initialData: FindProjectFullResponseDto) => {
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

const useProjectsUpdateMutation = (invalidate: boolean = true) => {
  const mutation = useMutation<unknown, unknown, UpdateProjectMutationParam>(
    ({ project }) => updateProject(project.id, project),
    {
      onSuccess: () => {
        if (invalidate) queryClient.invalidateQueries(["projects"]);
      },
    }
  );

  return mutation;
};

export { useProject, useProjectsCreateMutation, useProjectsUpdateMutation };
