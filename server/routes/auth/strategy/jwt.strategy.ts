import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import configs from '../../../server.config';
import { Request } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest:(req:Request)=> req.cookies.user,
      ignoreExpiration: false,
      secretOrKey: configs.secrets.publicKey,
      algorithms:['ES256']
    });
  }

  //자동 호출 메소드
  async validate(payload: any) {
    return {...payload};
  }
}