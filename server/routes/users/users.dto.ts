import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty()
  address: string;

  @ApiProperty()
  sign: string;

  @ApiProperty()
  email: string;
}

export class FindUserDto {
  @ApiProperty()
  address: string;

  @ApiProperty()
  sign: string;
}
