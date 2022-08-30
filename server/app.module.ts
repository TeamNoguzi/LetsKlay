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
import { TransactionModule } from "./routes/transaction/transaction.module";

@Module({
  imports: (() => {
    const production = process.env.NODE_ENV === "production";
    const nestModules = [
      TransactionModule,
      LikesModule,
      RewardsModule,
      ProjectsModule,
      UsersModule,
      AuthModule,
    ];

    const prodModules = [
      ...nestModules,
      TypeOrmModule.forRoot({
        ...configs["production"],
        entities: [__dirname + "/**/*.entity{.ts,.js}"],
        synchronize: true,
        //autoLoadEntities:true,
      }),
    ];

    const devModules = [
      ...nestModules,
      TypeOrmModule.forRoot({
        ...configs["development"],
        entities: [__dirname + "/**/*.entity{.ts,.js}"],
        synchronize: true,
        //autoLoadEntities:true,
      }),
    ];

    return production ? prodModules : devModules;
  })(),
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
