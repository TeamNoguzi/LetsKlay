import {
  FindProjectFullResponseDto,
  FindProjectResponseDto,
  UpdateProjectDto,
  UpdateProjectResponseDto,
} from "@/dto";
import { ProjectStatus } from "@/enums";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchLikedProjectsPaged,
  fetchProjectsPopular,
  fetchProjectsRecent,
  fetchProjectsUser,
  fetchProjectWithId,
  updateProject,
} from "api";
import { useAuthGuard } from "hooks/useAuthGuard";
import produce from "immer";
import { merge } from "lodash";

interface UpdateProjectMutationParam {
  project: UpdateProjectDto & { id: number };
}

const useProject = (initialProject: FindProjectFullResponseDto) => {
  const { data, isError } = useQuery(
    ["projects", { id: +initialProject.id }],
    () => fetchProjectWithId(+initialProject.id),
    {
      initialData: initialProject,
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

const useMyProjectsWithStates = (projectStatus: ProjectStatus) => {
  const { data, isError } = useQuery(["projects", "users", projectStatus], () =>
    fetchProjectsUser(projectStatus)
  );

  return { projects: data, isError };
};

const useProjectsLikedAndCount = (page: number) => {
  const { data, isError } = useQuery(["projects", "liked"], () => fetchLikedProjectsPaged(page), {
    keepPreviousData: true,
  });

  return { likes: data?.[0], count: data?.[1], isError };
};

const useProjectUpdateMutation = () => {
  const queryClient = useQueryClient();
  const updateProjectGuarded = useAuthGuard(updateProject);

  return useMutation<UpdateProjectResponseDto, unknown, UpdateProjectMutationParam>(
    ({ project }) => updateProjectGuarded({ id: +project.id, project }),
    {
      onSuccess: (data, { project }) => {
        queryClient.setQueryData(
          ["projects", { id: +project.id }],
          produce(project, (draft) => {
            merge(draft, data);
          })
        );
      },
    }
  );
};

export {
  useProject,
  useProjectsRecent,
  useProjectsPopular,
  useMyProjectsWithStates,
  useProjectsLikedAndCount,
  useProjectUpdateMutation,
};
