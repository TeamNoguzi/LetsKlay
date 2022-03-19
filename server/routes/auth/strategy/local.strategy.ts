import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField:'address',
            passwordField:'sign',
        });
    }

  //자동 호출 메소드
    async validate(address: string, sign: string) {
        const user = await this.authService.validateUser(address, sign);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}