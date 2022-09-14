import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchIsLiked, fetchLikesAll, likeProject, unlikeProject } from "api";
import queryClient from "./client";

interface LikesMutationParam {
  projectId: number;
  isLiked: boolean;
}

const useLikes = (projectId: number) => {
  const { data, isError } = useQuery(["likes"], () => fetchLikesAll(projectId));

  return { likes: data, isError };
};

const useIsLiked = (projectId: number) => {
  const { data, isError } = useQuery(["likes", "my"], () => fetchIsLiked(projectId));

  return { isLiked: data, isError };
};

const useToggleLikesMutation = () => {
  const mutation = useMutation<unknown, unknown, LikesMutationParam>(
    ({ projectId, isLiked }) => (isLiked ? unlikeProject(projectId) : likeProject(projectId)),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );

  return mutation;
};

export { useLikes, useIsLiked, useToggleLikesMutation };
