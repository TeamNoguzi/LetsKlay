import { FindUserResponseDto as FindUserResponseDtoType } from "@/dto";
import { ApiProperty } from "@nestjs/swagger";

class FindUserResponseDto implements FindUserResponseDtoType {
  @ApiProperty()
  id: number;

  @ApiProperty()
  address: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: "user" | "admin";

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  profileImgUrl: string;
}

export { FindUserResponseDto };
