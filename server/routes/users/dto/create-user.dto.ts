import { ApiProperty } from "@nestjs/swagger";
import {
  CreateUserDto as CreateUserDtoType,
  CreateUserResponseDto as CreateUserResponseDtoType,
} from "@/dto";

class CreateUserDto implements CreateUserDtoType {
  @ApiProperty()
  address: string;

  @ApiProperty()
  sign: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;
}

class CreateUserResponseDto implements CreateUserResponseDtoType {
  @ApiProperty()
  id: number;

  @ApiProperty()
  address: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;
}

export { CreateUserDto, CreateUserResponseDto };
