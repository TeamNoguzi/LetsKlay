import { Controller, UseGuards, Post, UploadedFile } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Roles } from "routes/auth/roles/roles.decorator";
import { JwtAuthGuard } from "routes/auth/guard/jwt-auth.guard";
import { RolesGuard } from "routes/auth/guard/roles.guard";
import { Role } from "routes/auth/roles/roles.enum";
import { Express } from "express";
import { ApiFile } from "./decorators/file.decorator";

@ApiTags("images")
@Controller("images")
export class ImagesController {
  constructor() {}

  @ApiOperation({ summary: "이미지 업로드" })
  @ApiBearerAuth()
  @ApiFile("image")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  @Post()
  create(@UploadedFile() file: Express.Multer.File) {
    return file.path;
  }
}
