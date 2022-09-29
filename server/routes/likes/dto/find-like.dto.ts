import { FindLikedProjectResponseDto as FindLikedProjectResponseDtoType } from "@/dto";
import { ApiProperty } from "@nestjs/swagger";
import { FindProjectResponseDto } from "routes/projects/dto/find-project.dto";

class FindLikedProjectResponseDto implements FindLikedProjectResponseDtoType {
  @ApiProperty()
  userId: number;
  @ApiProperty()
  projectId: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  project: FindProjectResponseDto;
}

export { FindLikedProjectResponseDto };
