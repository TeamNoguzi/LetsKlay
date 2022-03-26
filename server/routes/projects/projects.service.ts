import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/projects.entity';
import { ProjectStatus } from './projects.enum';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private projectsRepository: Repository<Project>
    ) {}

    // 프로젝트 소유자 id와 userId가 일치하는지 확인
    async verifyUserProject(userId:number, id:number) {
        const user = await this.projectsRepository.findOne({
            where:{
                id: id,
                user:{id:userId},
            }
        })
        if(!user) {
            const err = new Error('The user is not the owner of the project');
            err.name = 'Unauthorized';
            throw err;
        }
        return user;
    }

    async findAll() {
        return await this.projectsRepository.find({
            select: {
                id:true,
                title:true,
                subtitle:true,
                thumbnailUrl:true,
                fundGoal:true,
                fundNow:true,
                status:true
            },
        });
    }

    async findOne(id:number) {
        const project = this.projectsRepository
        .createQueryBuilder('project')
        .leftJoinAndSelect('project.rewards', 'rewards')
        .leftJoinAndSelect('rewards.items', 'items')
        .where('project.id = :id', {id})
        .getOne();
        return await project;
    }

    async findAllListFromUser(userId:number, status:number) {
        return await this.projectsRepository.find({
            select: {
                id:true,
                title:true,
                subtitle:true,
                thumbnailUrl:true,
                fundGoal:true,
                fundNow:true,
                status:true
            },
            where: {
                user: {id: userId},
                status
            }
        });
    }

    async createOne(userId:number, createDto:CreateProjectDto) {
        return await this.projectsRepository.save({...createDto, user: {id: userId}});
    }

    async updateOne(userId:number, id:number, updateDto:UpdateProjectDto) {
        await this.verifyUserProject(userId, id);
        return await this.projectsRepository.save({id: id, user: {id:userId}, ...updateDto});
    }

    async deleteOne(userId:number, id:number) {
        return await this.projectsRepository.delete({id:id, user:{id:userId}});
    }

    async updateStatusOne(userId:number, id:number, status:ProjectStatus) {
        const project = await this.projectsRepository
            .createQueryBuilder('project')
            .leftJoinAndSelect('project.rewards', 'reward')
            .where('project.id = :id', {id})
            .andWhere('project.userId = :userId', {userId})
            .getOne();

        const filled = Object.values(project).every((val, idx, arr) => (typeof val === 'number') || val != null);
        if(project && filled)
            return this.projectsRepository.update({user:{id:userId}, id: id}, {status});
        else {
            const err = new Error('The project information are not filled');
            err.name = 'NullException';
            throw err;
        }
    }
}
