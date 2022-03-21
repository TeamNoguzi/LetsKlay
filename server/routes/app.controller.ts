import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guard/local-auth.guard';
import { RolesGuard } from './auth/guard/roles.guard';
import { Roles } from './auth/roles/roles.decorator';
import { Role } from './auth/roles/roles.enum';
import { CreateUserDto, FindUserDto } from './users/users.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService
  ) {}
  
  @ApiBody({ type: FindUserDto})
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


  @Post('register')
  async register(@Body() createUserDto:CreateUserDto): Promise<boolean> {
    try {
      await this.authService.register(createUserDto);
      return true;
    }
    catch(err) {
      console.log(err);
      throw err;
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  @Get('verify')
  verify(@Req() req: Request): any {
    return req.user;
  }
}
