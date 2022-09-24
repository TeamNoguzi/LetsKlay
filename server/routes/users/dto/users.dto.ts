import { ApiProperty } from "@nestjs/swagger";
import { FindUserDto as FindUserDtoType } from "@/dto";

export class CreateUserDto {
  @ApiProperty()
  address: string;

  @ApiProperty()
  sign: string;

  @ApiProperty()
  email: string;
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
