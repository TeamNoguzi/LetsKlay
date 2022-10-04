import { Controller, Delete, Get, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FindProjectResponseDto } from "routes/projects/dto/find-project.dto";
import { ProjectsService } from "routes/projects/projects.service";
import { AdminService } from "./admin.service";
import { JwtAuthGuard } from "routes/auth/guard/jwt-auth.guard";
import { RolesGuard } from "routes/auth/guard/roles.guard";
import { Roles } from "routes/auth/roles/roles.decorator";
import { Role } from "routes/auth/roles/roles.enum";
import { DeleteResult } from "typeorm";

@ApiTags("admin")
@Controller("admin")
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly projectsService: ProjectsService
  ) {}

  @ApiOperation({
    summary: "프로젝트 강제 삭제",
    description: "프로젝트 강제 삭제",
  })
  @ApiResponse({ type: [FindProjectResponseDto] })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete("projects/:id")
  async removeProjectsOne(@Param("id") id: number): Promise<DeleteResult> {
    return await this.projectsService.deleteOneAdmin(+id);
  }
}
