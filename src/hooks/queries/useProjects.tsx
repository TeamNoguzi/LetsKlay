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
  fetchProjectsUserPaged,
  fetchProjectWithId,
  searchProjects,
  updateProject,
} from "api";
import { useAuthGuard } from "hooks/useAuthGuard";
import produce from "immer";
import { merge } from "lodash";

type UpdateProjectMutationParam = UpdateProjectDto & { id: number };

interface UseProjectsSearchParams {
  initialData?: [FindProjectResponseDto[], number];
  page: number;
  search: string;
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

const useProjectsSearch = ({ initialData, page, search }: UseProjectsSearchParams) => {
  const { data, isError } = useQuery(
    ["projects", search, page],
    () => searchProjects(page, search),
    { initialData, cacheTime: 100 }
  );
  return { projects: data?.[0], count: data?.[1], isError };
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

const useMyProjectsWithStatesPaged = (projectStatus: ProjectStatus, page: number) => {
  const { data, isError } = useQuery(["projects", "users", projectStatus, page], () =>
    fetchProjectsUserPaged(projectStatus, page)
  );

  return { projects: data?.[0], count: data?.[1], isError };
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
    (project) => updateProjectGuarded({ ...project }),
    {
      onSuccess: (data) => {
        return queryClient.setQueryData<FindProjectFullResponseDto>(
          ["projects", { id: +data.id }],
          (oldCache) =>
            produce(oldCache, (draft) => {
              merge(draft, data);
            })
        );
      },
    }
  );
};

export {
  useProject,
  useProjectsSearch,
  useProjectsRecent,
  useProjectsPopular,
  useMyProjectsWithStatesPaged,
  useProjectsLikedAndCount,
  useProjectUpdateMutation,
};
