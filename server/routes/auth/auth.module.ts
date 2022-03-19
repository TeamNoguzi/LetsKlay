import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import configs from '../../server.config';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
    imports: [
        UsersModule, 
        PassportModule,
        JwtModule.register(configs.secrets),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}