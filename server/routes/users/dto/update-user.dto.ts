import { ApiProperty } from "@nestjs/swagger";
import { UpdateUserDto as UpdateUserDtoType } from "@/dto";

export class UpdateUserDto implements UpdateUserDtoType {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  role?: "user" | "admin";

  @ApiProperty()
  isActive?: boolean;

  @ApiProperty()
  profileImgUrl?: string;
}
