import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchIsLiked, fetchLikesAll, likeProject, unlikeProject } from "api";
import queryClient from "./client";

const useLikes = (projectId: number) => {
  const { data, isError } = useQuery(["likes"], () => fetchLikesAll(projectId));

  return { likes: data, isError };
};

const useIsLiked = (projectId: number) => {
  const { data, isError } = useQuery(["likes", "my"], () => fetchIsLiked(projectId));

  return { isLiked: data, isError };
};

const useToggleLikes = (projectId: number, isLiked: boolean) => {
  const mutation = useMutation(
    () => (isLiked ? unlikeProject(projectId) : likeProject(projectId)),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );

  return mutation;
};

export { useLikes, useIsLiked, useToggleLikes };
