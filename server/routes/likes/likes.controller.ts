import { Controller, Get, Param, UseGuards, Put, Req, Delete } from "@nestjs/common";
import { LikesService } from "./likes.service";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Roles } from "routes/auth/roles/roles.decorator";
import { JwtAuthGuard } from "routes/auth/guard/jwt-auth.guard";
import { RolesGuard } from "routes/auth/guard/roles.guard";
import { Role } from "routes/auth/roles/roles.enum";
import { Request } from "express";

@ApiTags("likes")
@Controller("likes")
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @ApiOperation({ summary: "좋아요 표시" })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  @Put(":projectId")
  create(@Param("projectId") projectId: number, @Req() req: Request) {
    return this.likesService.create(+req.user.id, +projectId);
  }

  @ApiOperation({ summary: "좋아요 표시 해제" })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  @Delete(":projectId")
  remove(@Param("projectId") projectId: number, @Req() req: Request) {
    return this.likesService.remove(+req.user.id, +projectId);
  }

  @ApiOperation({ summary: "좋아요한 프로젝트 조회" })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  @Get("projects")
  findProjects(@Req() req: Request) {
    return this.likesService.findProjects(+req.user.id);
  }

  @ApiOperation({ summary: "좋아한 프로젝트인지 조회" })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  @Get("projects/:projectId")
  async findLikesOne(@Param("projectId") projectId: number, @Req() req: Request) {
    const result = await this.likesService.findLikesOne(+req.user.id, +projectId);
    return result.length > 0;
  }

  @ApiOperation({ summary: "프로젝트 내 좋아요 모두 조회" })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  @Get("projects/:projectId/all")
  findLikesAll(@Param("projectId") projectId: number) {
    return this.likesService.findLikesAll(+projectId);
  }
}
