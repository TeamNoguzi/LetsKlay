import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectsController } from "./projects.controller";
import { Project } from "./entities/projects.entity";
import { ProjectsService } from "./projects.service";
import { FundsModule } from "routes/funds/funds.module";

@Module({
  imports: [TypeOrmModule.forFeature([Project]), FundsModule],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
