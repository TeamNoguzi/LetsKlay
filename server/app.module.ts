import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import configs from "./config/server.config";
import { UsersModule } from "routes/users/users.module";
import { AuthModule } from "routes/auth/auth.module";
import { ProjectsModule } from "routes/projects/projects.module";
import { RewardsModule } from "./routes/rewards/rewards.module";
import { LikesModule } from "./routes/likes/likes.module";
import { ImagesModule } from "routes/images/images.module";
import { FundsModule } from "./routes/funds/funds.module";
import { AdminModule } from "./routes/admin/admin.module";
import { ConfigModule } from "@nestjs/config";
import { DataSource } from "typeorm";

@Module({
  imports: (() => {
    const production = process.env.NODE_ENV === "production";
    const nestModules = [
      FundsModule,
      LikesModule,
      RewardsModule,
      ProjectsModule,
      UsersModule,
      AuthModule,
      ImagesModule,
      AdminModule,
      ConfigModule.forRoot(),
    ];

    const prodModules = [
      ...nestModules,
      TypeOrmModule.forRoot({
        ...configs["production"],
        type: "mysql",
        entities: [__dirname + "/**/*.entity{.ts,.js}"],
        synchronize: true, // 원래는 적용하면 안되지만...
        logger: "simple-console",
      }),
    ];

    const devModules = [
      ...nestModules,
      TypeOrmModule.forRoot({
        ...configs["development"],
        type: "mysql",
        entities: [__dirname + "/**/*.entity{.ts,.js}"],
        synchronize: true,
        logger: "simple-console",
      }),
    ];

    return production ? prodModules : devModules;
  })(),
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
