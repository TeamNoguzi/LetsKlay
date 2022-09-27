import { FindLikedProjectResponseDto } from "@/dto";
import axios from "../axios";

const fetchLikedProjectsPaged = async (page: number) => {
  const { data } = await axios.get<[FindLikedProjectResponseDto[], number]>(
    `/likes/projects/list/${page}`
  );
  return data;
};

const fetchIsLiked = async (projectId: number) => {
  const { data } = await axios.get(`/likes/projects/${projectId}`);
  return data;
};

const fetchLikesAll = async (projectId: number) => {
  const { data } = await axios.get(`/likes/projects/${projectId}/all`);
  return data;
};

const likeProject = async (projectId: number) => {
  const { data } = await axios.put(`/likes/${projectId}`);
  return data;
};

const unlikeProject = async (projectId: number) => {
  const { data } = await axios.delete(`/likes/${projectId}`);
  return data;
};

export { likeProject, unlikeProject, fetchIsLiked, fetchLikesAll, fetchLikedProjectsPaged };
