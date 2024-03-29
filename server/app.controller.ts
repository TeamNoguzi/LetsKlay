import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody } from "@nestjs/swagger";
import { Request, Response } from "express";
import { AppService } from "./app.service";
import { AuthService } from "./routes/auth/auth.service";
import { JwtAuthGuard } from "./routes/auth/guard/jwt-auth.guard";
import { LocalAuthGuard } from "./routes/auth/guard/local-auth.guard";
import { RolesGuard } from "./routes/auth/guard/roles.guard";
import { Roles } from "./routes/auth/roles/roles.decorator";
import { Role } from "./routes/auth/roles/roles.enum";
import { CreateUserDto, CreateUserResponseDto } from "./routes/users/dto/create-user.dto";
import { FindUserResponseDto } from "routes/users/dto/find-user.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly authService: AuthService) {}

  @ApiBody({ type: FindUserResponseDto })
  @UseGuards(LocalAuthGuard)
  @Post("login")
  login(@Req() req: Request, @Res({ passthrough: true }) res: Response): void {
    const jwt = this.authService.login(req.user);
    res.cookie("user", jwt, {
      maxAge: 36000000,
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    return;
  }

  @Post("register")
  async register(
    @Body() createUserDto: CreateUserDto,
    @Res() response: Response
  ): Promise<CreateUserResponseDto> {
    try {
      return await this.authService.register(createUserDto);
    } catch (err) {
      if (err.driverError.code === "ER_DUP_ENTRY") {
        response.status(409).send("Wallet address is duplicated.");
      } else throw err;
    } finally {
      response.end();
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  @Get("verify")
  verify(@Req() req: Request): any {
    return req.user;
  }
}
