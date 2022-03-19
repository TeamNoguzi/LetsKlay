import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guard/local-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: Request, @Res({passthrough: true}) res: Response): void {
    const jwt = this.authService.login(req.user);
    res.cookie('user', jwt, {
      maxAge: 36000000,
      httpOnly:true,
      sameSite:'strict',
      secure:true
    });
    return;
  }

  @UseGuards(JwtAuthGuard)
  @Get('verify')
  verify(@Req() req: Request): any {
    return req.user;
  }
}
