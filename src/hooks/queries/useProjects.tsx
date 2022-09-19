import { FindProjectFullResponseDto, FindProjectResponseDto, UpdateProjectDto } from "@/dto";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchProjectsPopular, fetchProjectsRecent, fetchProjectWithId, updateProject } from "api";
import queryClient from "./client";

interface UpdateProjectMutationParam {
  project: UpdateProjectDto & { id: number };
}

const useProject = (projectId: number, initialData: FindProjectFullResponseDto) => {
  const { data, isError } = useQuery(["projects", projectId], () => fetchProjectWithId(projectId), {
    initialData,
  });

  return { project: data, isError };
};

const useProjectsRecent = (initialData?: FindProjectResponseDto[]) => {
  const { data, isError } = useQuery(["projects", "recent"], () => fetchProjectsRecent(), {
    initialData,
  });

  return { projects: data, isError };
};

const useProjectsPopular = (initialData?: FindProjectResponseDto[]) => {
  const { data, isError } = useQuery(["projects", "popular"], () => fetchProjectsPopular(), {
    initialData,
  });

  return { projects: data, isError };
};

const useProjectUpdateMutation = (invalidate: boolean = true) => {
  const mutation = useMutation<unknown, unknown, UpdateProjectMutationParam>(
    ({ project }) => updateProject(project.id, project),
    {
      onSuccess: (_, { project }) => {
        if (invalidate) queryClient.invalidateQueries(["projects", project.id]);
      },
    }
  );

  return mutation;
};

export { useProject, useProjectsRecent, useProjectsPopular, useProjectUpdateMutation };
