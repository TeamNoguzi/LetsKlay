import { Controller, Get, Param, Req, UseGuards } from "@nestjs/common";
import { FundsService } from "./funds.service";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "routes/auth/guard/jwt-auth.guard";
import { RolesGuard } from "routes/auth/guard/roles.guard";
import { Roles } from "routes/auth/roles/roles.decorator";
import { Role } from "routes/auth/roles/roles.enum";
import { Request } from "express";

@ApiTags("transaction")
@Controller("transaction")
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
    summary: "후원 내역 조회 (페이징)",
    description: "한번에 10개씩 후원 내역을 가져온다",
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  @Get("/all/user/:page")
  async updateOne(@Req() req: Request, @Param("page") page: number) {
    return this.fundsService.findAllWithUserPaged(+req.user.id, +page);
  }
}
