import axios from "../axios";

const fetchProjects = async () => {
  const { data } = await axios.get("/projects");
  return data;
};

const fetchProjectWithId = async (id: number) => {
  const { data } = await axios.get(`/projects/${id}`);
  return data;
};

export { fetchProjects, fetchProjectWithId };
