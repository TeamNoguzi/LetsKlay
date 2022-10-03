import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Like } from "./entities/like.entity";

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private readonly likesRepository: Repository<Like>
  ) {}

  create(userId: number, projectId: number) {
    return this.likesRepository.save({
      user: {
        id: userId,
      },
      project: {
        id: projectId,
      },
    });
  }

  async findProjectsPaged(userId: number, page: number) {
    return this.likesRepository
      .findAndCount({
        relations: ["project"],
        where: { user: { id: userId } },
        take: 10,
        skip: 10 * page,
        order: { createdAt: "DESC" },
      })
      .then((result) => [result[0], Math.floor(result[1] / 10) + (result[1] % 10 ? 1 : 0)]);
  }

  findLikesOne(userId: number, projectId: number) {
    return this.likesRepository.find({
      where: { user: { id: userId }, project: { id: projectId } },
    });
  }

  findLikesAll(projectId: number) {
    return this.likesRepository.find({
      where: { project: { id: projectId } },
    });
  }

  remove(userId: number, projectId: number) {
    return this.likesRepository.delete({
      user: {
        id: userId,
      },
      project: {
        id: projectId,
      },
    });
  }

  count(projectId: number) {
    return this.likesRepository.count({
      where: {
        project: {
          id: projectId,
        },
      },
    });
  }
}
