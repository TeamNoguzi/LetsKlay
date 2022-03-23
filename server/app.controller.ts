import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AppService } from './app.service';
import { AuthService } from './routes/auth/auth.service';
import { JwtAuthGuard } from './routes/auth/guard/jwt-auth.guard';
import { LocalAuthGuard } from './routes/auth/guard/local-auth.guard';
import { RolesGuard } from './routes/auth/guard/roles.guard';
import { Roles } from './routes/auth/roles/roles.decorator';
import { Role } from './routes/auth/roles/roles.enum';
import { CreateUserDto, FindUserDto } from './routes/users/users.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService
  ) {}
  
  @ApiBody({type: FindUserDto})
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
