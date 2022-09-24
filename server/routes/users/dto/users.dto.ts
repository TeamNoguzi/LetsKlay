import { ApiProperty } from "@nestjs/swagger";
import {
  FindUserDto as FindUserDtoType,
  CreateUserDto as CreateUserDtoType,
  UpdateUserDto as UpdateUserDtoType,
} from "@/dto";

export class CreateUserDto implements CreateUserDtoType {
  @ApiProperty()
  address: string;

  @ApiProperty()
  sign: string;

  @ApiProperty()
  email: string;
}

export class UpdateUserDto implements UpdateUserDtoType {
  @ApiProperty()
  email?: string;

  @ApiProperty()
  role?: "user" | "admin";

  @ApiProperty()
  isActive?: boolean;

  @ApiProperty()
  profileImgUrl?: string;
}

export class FindUserDto implements FindUserDtoType {
  @ApiProperty()
  id: number;

  @ApiProperty()
  address: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: "user" | "admin";

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  profileImgUrl: string;
}
