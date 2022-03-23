import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'routes/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'routes/auth/guard/roles.guard';
import { Roles } from 'routes/auth/roles/roles.decorator';
import { Role } from 'routes/auth/roles/roles.enum';
import { DeleteResult, UpdateResult } from 'typeorm';
import { 
    CreateProjectDto, 
    FindProjectResponseDto, 
    FindProjectFullResponseDto, 
    UpdateProjectDto, 
    CreateProjectResponseDto,
} from './projects.dto';
import { ProjectStatus } from './projects.enum';
import { ProjectsService } from './projects.service';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
    constructor(
        private readonly projectsService : ProjectsService
    ) {}
    
    // 페이지네이션 구현 후에 변경해야함
    @ApiOperation({summary:'프로젝트 전체 조회'})
    @ApiResponse({type: [FindProjectResponseDto]})
    @Get()
    async findAll(): Promise<FindProjectResponseDto[]> {
        return await this.projectsService.findAll();
    }

    @ApiOperation({summary:'프로젝트 조회'})
    @ApiResponse({type: FindProjectFullResponseDto})
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<FindProjectFullResponseDto> {
        return await this.projectsService.findOne(id);
    }

    @ApiOperation({summary:'프로젝트 수정'})
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.User, Role.Admin)
    @Patch(':id')
    async updateOne(
        @Req() req: Request,
        @Param('id') id: number, 
        @Body() updateDto : UpdateProjectDto
    ): Promise<UpdateResult> {
        return await this.projectsService.updateOne(Number(req.user.id), id, updateDto);
    }

    @ApiOperation({summary:'프로젝트 삭제'})
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.User, Role.Admin)
    @Delete(':id')
    async deleteOne(
        @Req() req: Request,
        @Param('id') id: number, 
    ): Promise<DeleteResult> {
        return await this.projectsService.deleteOne(Number(req.user.id), id);
    }


    @ApiOperation({summary:'프로젝트 상태 변경'})
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.User, Role.Admin)
    @Patch(':id/:status')
    async updateStatusOne(
        @Req() req: Request,
        @Param('id') id: number,
        @Param('status') status: ProjectStatus
    ): Promise<UpdateResult> {
        return await this.projectsService.updateStatusOne(Number(req.user.id), id, status);
    }

    @ApiOperation({summary:'내 상태별 프로젝트 리스트 조회'})
    @ApiResponse({type: [FindProjectResponseDto]})
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.User, Role.Admin)
    @Get('mylist/:status')
    async findAllListFromUser(@Req() req: Request, @Param('status') status: number): Promise<FindProjectResponseDto[]> {
        return await this.projectsService.findAllListFromUser(Number(req.user.id), status);
    }

    @ApiOperation({summary:'프로젝트 생성'})
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.User, Role.Admin)
    @Post()
    async createOne(@Req() req: Request, @Body() createDto : CreateProjectDto): Promise<CreateProjectResponseDto> {
        return await this.projectsService.createOne(Number(req.user.id), createDto);
    }
}
