import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { JwtAuthGuard } from "routes/auth/guard/jwt-auth.guard";
import { RolesGuard } from "routes/auth/guard/roles.guard";
import { Roles } from "routes/auth/roles/roles.decorator";
import { Role } from "routes/auth/roles/roles.enum";
import { FindUserDto } from "./dto/users.dto";
import { UsersService } from "./users.service";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: "자기 정보 조회" })
  @ApiResponse({ type: FindUserDto })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  @Get()
  async findOneMe(@Req() req: Request): Promise<FindUserDto> {
    return await this.usersService.findOneWithId(+req.user.id);
  }
}
