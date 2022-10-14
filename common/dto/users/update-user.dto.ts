import { FindUserDto } from "./find-user.dto";

interface UpdateUserDto {
  name?: string;
  email?: string;
  role?: "user" | "admin";
  isActive?: boolean;
  profileImgUrl?: string;
}

interface UpdateUserResponseDto extends FindUserDto {}

export type { UpdateUserDto, UpdateUserResponseDto };
