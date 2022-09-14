import { Project } from "@/entities";
import axios from "../axios";

const fetchProjects = async () => {
  const { data } = await axios.get<Project[]>("/projects");
  return data;
};

const fetchProjectWithId = async (id: number) => {
  const { data } = await axios.get<Project>(`/projects/${id}`);
  return data;
};

const createProject = async (project?: Project) => {
  const { data } = await axios.post("/projects", project);
  return data;
};

const updateProject = async (id: number, project: Project) => {
  const { data } = await axios.patch(`/projects/${id}`, project);
  return data;
};

export { fetchProjects, fetchProjectWithId, createProject, updateProject };
