import { Controller, Get, Param, Req, UseGuards } from "@nestjs/common";
import { FundsService } from "./funds.service";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "routes/auth/guard/jwt-auth.guard";
import { RolesGuard } from "routes/auth/guard/roles.guard";
import { Roles } from "routes/auth/roles/roles.decorator";
import { Role } from "routes/auth/roles/roles.enum";
import { Request } from "express";

@ApiTags("funds")
@Controller("funds")
export class FundsController {
  constructor(private readonly fundsService: FundsService) {}

  @Get()
  findAll() {
    return this.fundsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.fundsService.findOne(+id);
  }

  @ApiOperation({
    summary: "후원 내역 수 조회",
    description: "후원 내역의 수를 조회한다",
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  @Get("/all/user/count")
  async findAllWithUserCount(@Req() req: Request) {
    return this.fundsService.findAllWithUserCount(+req.user.id);
  }

  @ApiOperation({
    summary: "후원 내역 조회 (페이징)",
    description: "한번에 10개씩 후원 내역을 가져온다. 페이지는 1부터 시작한다",
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  @Get("/all/user/:page")
  async findAllWithUserPaged(@Req() req: Request, @Param("page") page: number) {
    if (Number.isInteger(+page) && +page > 0)
      return this.fundsService.findAllWithUserPaged(+req.user.id, +page - 1);
    return Promise.reject("Page should be integer and larger than 0.");
  }
}
