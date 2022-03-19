import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import configs from '../server.config';

import { ServeStaticModule } from '@nestjs/serve-static';
import { UsersModule } from './users/users.module';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: (() => {
    const production = process.env.NODE_ENV === 'production';
    const nestModules = [
      UsersModule,
      AuthModule,
    ];

    const prodModules = [
      ...nestModules,
      TypeOrmModule.forRoot({
        ...configs['production'],
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize:true,
        //autoLoadEntities:true,
      }),
      ServeStaticModule.forRoot({
        rootPath: join(__dirname, 'src'),
      }),
    ];

    const devModules = [
      ...nestModules,
      TypeOrmModule.forRoot({
        ...configs['development'],
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize:true,
        //autoLoadEntities:true,
      }),
      ServeStaticModule.forRoot({
        rootPath: join(__dirname, 'src'),
      }),
    ];

    return production? prodModules : devModules;
  })(),
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
