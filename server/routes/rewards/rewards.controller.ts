import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { RewardsService } from './rewards.service';
import { CreateRewardDto } from './dto/create-reward.dto';
import { UpdateRewardDto } from './dto/update-reward.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Reward } from './entities/reward.entity';
import { Roles } from 'routes/auth/roles/roles.decorator';
import { JwtAuthGuard } from 'routes/auth/guard/jwt-auth.guard';
import { Role } from 'routes/auth/roles/roles.enum';
import { RolesGuard } from 'routes/auth/guard/roles.guard';
import { Request } from 'express';
import { ProjectsService } from 'routes/projects/projects.service';

@ApiTags('rewards')
@Controller('rewards')
export class RewardsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly rewardsService: RewardsService
  ) {}

  @ApiOperation({summary:'리워드 추가'})
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  @Post(':projectId')
  async createOne(
    @Param('projectId') projectId: number, 
    @Body() createRewardDto: CreateRewardDto,
    @Req() req: Request,
  ): Promise<Reward> {
      const project = await this.projectsService.verifyUserProject(Number(req.user.id), projectId);
      if(project)
        return await this.rewardsService.createOne(projectId, createRewardDto);
      else throw new Error('You are not the owner of the project');
  }

  @ApiOperation({summary:'리워드 전체 조회'})
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  @Get(':projectId')
  async findAll(
    @Param('projectId') projectId: number,
    @Req() req: Request,
  ): Promise<Reward[]> {
    const project = await this.projectsService.verifyUserProject(Number(req.user.id), projectId);
    if(project)
      return await this.rewardsService.findAll(projectId);
    else throw new Error('You are not the owner of the project');
  }

  @ApiOperation({summary:'리워드 수정'})
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  @Patch(':id')
  updateOne(@Param('id') id: string, @Body() updateRewardDto: UpdateRewardDto) {
    return this.rewardsService.updateOne(+id, updateRewardDto);
  }

  @ApiOperation({summary:'리워드 삭제'})
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rewardsService.deleteOne(+id);
  }
}
