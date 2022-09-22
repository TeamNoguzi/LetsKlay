import { Module } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { ProjectsModule } from "routes/projects/projects.module";

@Module({
  imports: [ProjectsModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
