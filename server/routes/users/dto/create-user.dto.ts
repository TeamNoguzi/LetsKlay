import { ApiProperty } from "@nestjs/swagger";
import { CreateUserDto as CreateUserDtoType } from "@/dto";

export class CreateUserDto implements CreateUserDtoType {
  @ApiProperty()
  address: string;

  @ApiProperty()
  sign: string;

  @ApiProperty()
  email: string;
}
