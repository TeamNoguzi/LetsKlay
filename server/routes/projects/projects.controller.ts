import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'routes/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'routes/auth/guard/roles.guard';
import { Roles } from 'routes/auth/roles/roles.decorator';
import { Role } from 'routes/auth/roles/roles.enum';
import { CreateProjectDto, FindProjectResponseDto, FindProjectFullResponseDto } from './projects.dto';
import { ProjectsService } from './projects.service';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
    constructor(
        private readonly projectsService : ProjectsService
    ) {}

    @ApiResponse({type: FindProjectFullResponseDto})
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<FindProjectFullResponseDto> {
        return await this.projectsService.findOne(id);
    }

    @ApiResponse({type: [FindProjectResponseDto]})
    @Get(':userId/all')
    async findAllListFromUser(@Param('userId') userId: number): Promise<FindProjectResponseDto[]> {
        return await this.projectsService.findAllListFromUser(userId);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.User, Role.Admin)
    @Post()
    async createOne(@Req() req: Request, @Body() createDto : CreateProjectDto) {
        await this.projectsService.createOne(Number(req.user.id) , createDto);
    }
}
