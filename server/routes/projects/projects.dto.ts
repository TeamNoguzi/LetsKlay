import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Project } from "./projects.entity";

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
    description?: string;
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
    description: string;
}

export class FindAllProjectListResponseDto{
    @ApiProperty()
    title: string;

    @ApiProperty()
    subtitle: string;
  
    @ApiProperty()
    summary: string;
  
    @ApiProperty()
    thumbnailUrl: string;
}