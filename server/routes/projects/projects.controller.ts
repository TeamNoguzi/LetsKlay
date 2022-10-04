import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { JwtAuthGuard } from "routes/auth/guard/jwt-auth.guard";
import { RolesGuard } from "routes/auth/guard/roles.guard";
import { Roles } from "routes/auth/roles/roles.decorator";
import { Role } from "routes/auth/roles/roles.enum";
import { DeleteResult, UpdateResult } from "typeorm";
import { CreateProjectDto, CreateProjectResponseDto } from "./dto/create-project.dto";
import { FindProjectResponseDto, FindProjectFullResponseDto } from "./dto/find-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { ProjectStatus } from "@/enums";
import { ProjectsService } from "./projects.service";

@ApiTags("projects")
@Controller("projects")
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ApiOperation({
    summary: "전체 프로젝트 확인",
    description: "페이지는 1부터 시작. 한 페이지에 12개",
  })
  @ApiResponse({ type: [FindProjectResponseDto] })
  @Get("search/:page")
  async findPaged(
    @Param("page") page: number,
    @Query("search") search: string
  ): Promise<[FindProjectResponseDto[], number]> {
    return await this.projectsService.searchPaged(+page - 1, search);
  }

  @ApiOperation({
    summary: "최근 10개 프로젝트 조회",
    description: "최근 공개된 프로젝트 10개 조회",
  })
  @ApiResponse({ type: [FindProjectResponseDto] })
  @Get("recents")
  async findRecents(): Promise<FindProjectResponseDto[]> {
    return await this.projectsService.findRecents();
  }

  @ApiOperation({
    summary: "좋아요가 가장 많은 프로젝트 조회",
    description: "좋아요가 가장 많은 프로젝트 조회",
  })
  @ApiResponse({ type: [FindProjectResponseDto] })
  @Get("popular")
  async findPopular(): Promise<FindProjectResponseDto[]> {
    return await this.projectsService.findPopular();
  }

  @ApiOperation({ summary: "프로젝트 조회" })
  @ApiResponse({ type: FindProjectFullResponseDto })
  @Get(":id")
  async findOne(@Param("id") id: number): Promise<FindProjectFullResponseDto> {
    return await this.projectsService.findOne(+id);
  }

  @ApiOperation({
    summary: "프로젝트 수정",
    description: "프로젝트가 비공개 상태일 경우에만 사용 가능",
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  @Patch(":id")
  async updateOne(
    @Req() req: Request,
    @Param("id") id: number,
    @Body() updateDto: UpdateProjectDto
  ) {
    return await this.projectsService.updateOne(+req.user.id, +id, updateDto);
  }

  @ApiOperation({
    summary: "프로젝트 삭제",
    description: "프로젝트가 비공개 상태일 경우에만 사용 가능",
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  @Delete(":id")
  async deleteOne(@Req() req: Request, @Param("id") id: number): Promise<DeleteResult> {
    return await this.projectsService.deleteOne(+req.user.id, +id);
  }

  @ApiOperation({
    summary: "프로젝트 공개 전환",
    description: "프로젝트가 모두 작성되어야 사용 가능",
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  @Patch(":id/public")
  async updateStatusOne(@Req() req: Request, @Param("id") id: number): Promise<UpdateResult> {
    return await this.projectsService.updateStatusOne(+req.user.id, +id, ProjectStatus.funding);
  }

  @ApiOperation({
    summary: "내 상태별 프로젝트 리스트 조회",
    description: "10개씩 페이지네이션 한다. 페이지는 1부터 시작",
  })
  @ApiResponse({ type: [FindProjectResponseDto] })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  @Get("mylist/:status/:page")
  async findAllListFromUser(
    @Req() req: Request,
    @Param("status") status: number,
    @Param("page") page: number
  ): Promise<[FindProjectResponseDto[], number]> {
    return await this.projectsService.findAllListFromUserPaged(+req.user.id, +status, +page - 1);
  }

  @ApiOperation({ summary: "프로젝트 생성" })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  @Post()
  async createOne(
    @Req() req: Request,
    @Body() createDto: CreateProjectDto
  ): Promise<CreateProjectResponseDto> {
    return await this.projectsService.createOne(+req.user.id, createDto);
  }
}
