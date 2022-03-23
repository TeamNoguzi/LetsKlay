import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { CreateProjectDto, CreateProjectResponseDto } from "./create-project.dto";

export class UpdateProjectDto extends CreateProjectDto {}
export class UpdateProjectResponseDto extends CreateProjectResponseDto {}
