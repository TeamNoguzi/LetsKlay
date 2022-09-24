import { FindUserDto } from "./find-user.dto";

interface UpdateUserDto {
  email?: string;
  role?: "user" | "admin";
  isActive?: boolean;
  profileImgUrl?: string;
}

interface UpdateUserResponseDto extends FindUserDto {}

export { UpdateUserDto, UpdateUserResponseDto };
