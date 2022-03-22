import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ProjectStatus } from "./projects.enum";

export class CreateProjectDto{
    @ApiPropertyOptional()
    title?: string;

    @ApiPropertyOptional()
    subtitle?: string;
  
    @ApiPropertyOptional()
    summary?: string;
  
    @ApiPropertyOptional()
    thumbnailUrl?: string;

    @ApiPropertyOptional()
    mainPictureUrl?: string;
  
    @ApiPropertyOptional()
    description?: string;

    @ApiPropertyOptional()
    fundGoal?: number;
}

export class FindProjectResponseDto{
    @ApiProperty()
    title: string;

    @ApiProperty()
    subtitle: string;
  
    @ApiProperty()
    summary: string;
  
    @ApiProperty()
    thumbnailUrl: string;

    @ApiProperty()
    fundGoal: number;

    @ApiProperty()
    fundNow: number;

    @ApiProperty()
    status: ProjectStatus;
}

export class FindProjectFullResponseDto extends FindProjectResponseDto{
    @ApiProperty()
    mainPictureUrl: string;
  
    @ApiProperty()
    description: string;

    @ApiProperty()
    createdAt: Date;
}

