import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './projects.dto';
import { Project } from './projects.entity';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private projectsRepository: Repository<Project>
    ) {}

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
}
