import {
  UpdateProjectDto as UpdateProjectDtoType,
  UpdateProjectResponseDto as UpdateProjectResponseDtoType,
} from "@/dto";
import { CreateProjectDto, CreateProjectResponseDto } from "./create-project.dto";

export class UpdateProjectDto extends CreateProjectDto implements UpdateProjectDtoType {}
export class UpdateProjectResponseDto
  extends CreateProjectResponseDto
  implements UpdateProjectResponseDtoType {}
