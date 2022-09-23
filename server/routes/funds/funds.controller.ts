import { Controller, Get, Param } from "@nestjs/common";
import { FundsService } from "./funds.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("transaction")
@Controller("transaction")
export class FundsController {
  constructor(private readonly fundsService: FundsService) {}

  @Get()
  findAll() {
    return this.fundsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.fundsService.findOne(+id);
  }
}
