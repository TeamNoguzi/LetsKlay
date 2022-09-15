import { CreateProjectDto, CreateProjectResponseDto } from "./create-project.dto";

interface UpdateProjectDto extends CreateProjectDto {}
interface UpdateProjectResponseDto extends CreateProjectResponseDto {}

export type { UpdateProjectDto, UpdateProjectResponseDto };
