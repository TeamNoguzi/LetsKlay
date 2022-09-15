import {
  FindProjectResponseDto,
  FindProjectFullResponseDto,
  CreateProjectDto,
  UpdateProjectDto,
} from "@/dto";
import axios from "../axios";

const fetchProjects = async () => {
  const { data } = await axios.get<FindProjectResponseDto[]>("/projects");
  return data;
};

const fetchProjectWithId = async (id: number) => {
  const { data } = await axios.get<FindProjectFullResponseDto>(`/projects/${id}`);
  return data;
};

const createProject = async (project?: CreateProjectDto) => {
  const { data } = await axios.post("/projects", project);
  return data;
};

const updateProject = async (id: number, project: UpdateProjectDto) => {
  const { data } = await axios.patch(`/projects/${id}`, project);
  return data;
};

export { fetchProjects, fetchProjectWithId, createProject, updateProject };
