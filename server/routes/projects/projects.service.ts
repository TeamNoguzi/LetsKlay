import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto, UpdateProjectDto } from './projects.dto';
import { Project } from './projects.entity';
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
        return await this.projectsRepository.findOne({where: {id: id}});
    }

    async findAllListFromUser(userId:number) {
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
            where: {user: {id: userId}}
        });
    }

    async createOne(userId:number, createDto:CreateProjectDto) {
        return await this.projectsRepository.save({...createDto, user: {id: userId}});
    }

    async updateOne(userId:number, id:number, updateDto:UpdateProjectDto) {
        await this.verifyUserProject(userId, id);
        return await this.projectsRepository.save({...updateDto, id: id});
    }

    async deleteOne(userId:number, id:number) {
        await this.verifyUserProject(userId, id);
        return await this.projectsRepository.delete({id});
    }

    async updateStatusOne(userId:number, id:number, status:ProjectStatus): Promise<Project> {
        const user = await this.verifyUserProject(userId, id);
        const filled = Object.keys(user).every((val, idx, arr) => user[val]);
        if(filled)
            return this.projectsRepository.save({id, status});
        else {
            const err = new Error('The project information are not filled');
            err.name = 'NullException';
            throw err;
        }
    }
}
