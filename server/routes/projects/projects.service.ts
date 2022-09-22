import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { Project } from "./entities/projects.entity";
import { ProjectStatus } from "@/enums";
import Caver, { AbiItem } from "caver-js";
import FactoryABI from "@/klaytn/build/contracts/Factory.json";

@Injectable()
export class ProjectsService implements OnModuleInit {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>
  ) {}

  onModuleInit() {
    const caver = new Caver("wss://api.baobab.klaytn.net:8652/");
    const contract = new caver.contract(FactoryABI.abi as AbiItem[], process.env.FACTORY_ADDR);

    contract.events
      .ProjectOpenEvent({}, function (error, event) {
        console.log(event);
      })
      .on("connected", function (subscriptionId) {
        console.log(subscriptionId);
      })
      .on("data", (data) => {
        console.log(data, "open");
      })
      .on("error", console.error);

    contract.events
      .ProjectCloseEvent()
      .on("connected", function (subscriptionId) {
        console.log(subscriptionId);
      })
      .on("data", (data) => {
        console.log(data, "close");
      });

    contract.events
      .FundEndEvent((data) => {
        console.log(data);
      })
      .on("connected", function (subscriptionId) {
        console.log(subscriptionId);
      })
      .on("data", (data) => {
        console.log(data, "end");
      });
  }

  // 프로젝트 소유자 id와 userId가 일치하는지 확인
  async verifyUserProject(userId: number, id: number) {
    const user = await this.projectsRepository.findOne({
      where: {
        id: id,
        user: { id: userId },
      },
    });
    if (!user) {
      const err = new Error("The user is not the owner of the project");
      err.name = "Unauthorized";
      throw err;
    }
    return user;
  }

  // 프로젝트가 비공개 상태인지 확인
  async confirmPreparing(id: number) {
    const project = await this.projectsRepository.findOne({
      where: {
        id: id,
        status: ProjectStatus.preparing,
      },
    });
    if (!project) {
      const err = new Error("The project is public. Cannot modify public projects.");
      err.name = "Prohibited Modification";
      throw err;
    }
    return project;
  }

  async findAll() {
    return await this.projectsRepository.find({
      select: {
        id: true,
        title: true,
        subtitle: true,
        summary: true,
        thumbnailUrl: true,
        fundGoal: true,
        fundNow: true,
        status: true,
      },
    });
  }

  async findRecents() {
    return await this.projectsRepository
      .createQueryBuilder("project")
      .select()
      .where("project.status != :status", { status: ProjectStatus.preparing })
      .orderBy("project.updatedAt", "ASC")
      .limit(10)
      .getMany();
  }

  async findPopular() {
    return await this.projectsRepository
      .createQueryBuilder("project")
      .select()
      .addSelect("COUNT(*) AS count")
      .leftJoin("project.likes", "likes")
      .where("project.status != :status", { status: ProjectStatus.preparing })
      .groupBy("project.id")
      .orderBy("count", "DESC")
      .limit(10)
      .getMany();
  }

  // 수정 필요 : 소유자 제외하면 공개된 프로젝트만 조회할 수 있도록 변경필요
  async findOne(id: number) {
    const project = this.projectsRepository
      .createQueryBuilder("project")
      .leftJoinAndSelect("project.rewards", "rewards")
      .leftJoinAndSelect("rewards.items", "items")
      .where("project.id = :id", { id })
      .getOne();
    return await project;
  }

  async findAllListFromUser(userId: number, status: number) {
    return await this.projectsRepository.find({
      select: {
        id: true,
        title: true,
        subtitle: true,
        thumbnailUrl: true,
        fundGoal: true,
        fundNow: true,
        status: true,
      },
      where: {
        user: { id: userId },
        status,
      },
    });
  }

  async createOne(userId: number, createDto: CreateProjectDto) {
    return await this.projectsRepository.save({ ...createDto, user: { id: userId } });
  }

  async updateOne(userId: number, id: number, updateDto: UpdateProjectDto) {
    await this.verifyUserProject(userId, id);
    await this.confirmPreparing(id);
    return await this.projectsRepository.save({ id: id, user: { id: userId }, ...updateDto });
  }

  async updateStatusOne(userId: number, id: number, status: ProjectStatus) {
    const project = await this.projectsRepository
      .createQueryBuilder("project")
      .leftJoinAndSelect("project.rewards", "reward")
      .where("project.id = :id", { id })
      .andWhere("project.userId = :userId", { userId })
      .getOne();

    const filled = Object.entries(project).every(
      ([_key, val]) => typeof val === "number" || val != null
    );

    if (project && filled)
      return this.projectsRepository.update({ user: { id: userId }, id: id }, { status });
    else {
      const err = new Error("The project information are not filled");
      err.name = "NullException";
      throw err;
    }
  }

  async deleteOne(userId: number, id: number) {
    return await this.projectsRepository.delete({ id: id, user: { id: userId } });
  }

  async deleteOneAdmin(id: number) {
    return await this.projectsRepository.delete({ id });
  }
}
