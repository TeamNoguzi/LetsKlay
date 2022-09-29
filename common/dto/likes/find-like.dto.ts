import { FindProjectResponseDto } from "../projects";

interface FindLikedProjectResponseDto {
  userId: number;
  projectId: number;
  createdAt: Date;
  project: FindProjectResponseDto;
}

export { FindLikedProjectResponseDto };
