import {
  FindProjectFullResponseDto,
  FindProjectResponseDto,
  UpdateProjectDto,
  UpdateProjectResponseDto,
} from "@/dto";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchProjectsPopular, fetchProjectsRecent, fetchProjectWithId, updateProject } from "api";
import { useAuthGuard } from "hooks/useAuthGuard";

interface UpdateProjectMutationParam {
  project: UpdateProjectDto & { id: number };
}

const useProject = (projectId: number, initialData: FindProjectFullResponseDto) => {
  const { data, isError } = useQuery(
    ["projects", { id: +projectId }],
    () => fetchProjectWithId(projectId),
    {
      initialData,
    }
  );

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

const useProjectUpdateMutation = () => {
  const queryClient = useQueryClient();
  const updateProjectGuarded = useAuthGuard(updateProject);

  return useMutation<UpdateProjectResponseDto, unknown, UpdateProjectMutationParam>(
    ({ project }) => updateProjectGuarded({ id: +project.id, project }),
    {
      onSuccess: (data, { project }) => {
        queryClient.setQueryData(["projects", { id: +project.id }], data);
      },
    }
  );
};

export { useProject, useProjectsRecent, useProjectsPopular, useProjectUpdateMutation };
