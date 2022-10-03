import {
  FindProjectResponseDto,
  FindProjectFullResponseDto,
  CreateProjectDto,
  UpdateProjectDto,
  CreateProjectResponseDto,
  UpdateProjectResponseDto,
} from "@/dto";
import { ProjectStatus } from "@/enums";
import axios from "../axios";

interface UpdateProjectParam {
  id: number;
  project: UpdateProjectDto;
}

const fetchProjects = async () => {
  const { data } = await axios.get<FindProjectResponseDto[]>("/projects");
  return data;
};

const fetchProjectsRecent = async () => {
  const { data } = await axios.get<FindProjectResponseDto[]>("/projects/recents");
  return data;
};

const fetchProjectsPopular = async () => {
  const { data } = await axios.get<FindProjectResponseDto[]>("/projects/popular");
  return data;
};

const fetchProjectWithId = async (id: number) => {
  const { data } = await axios.get<FindProjectFullResponseDto>(`/projects/${id}`);
  return data;
};

const fetchProjectsUserPaged = async (status: ProjectStatus, page: number) => {
  const { data } = await axios.get<[FindProjectResponseDto[], number]>(
    `/projects/mylist/${status}/${page}`
  );
  return data;
};

const createProject = async (project?: CreateProjectDto) => {
  const { data } = await axios.post<CreateProjectResponseDto>("/projects", project);
  return data;
};

const updateProject = async ({ id, project }: UpdateProjectParam) => {
  const { data } = await axios.patch<UpdateProjectResponseDto>(`/projects/${id}`, project);
  return data;
};

const updateProjectPublic = async (id: number) => {
  const { data } = await axios.patch(`/projects/${id}/public`);
  return data;
};

export {
  fetchProjects,
  fetchProjectsRecent,
  fetchProjectsPopular,
  fetchProjectsUserPaged,
  fetchProjectWithId,
  createProject,
  updateProject,
  updateProjectPublic,
};
