import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { FundsService } from "./funds.service";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("transaction")
@Controller("transaction")
export class FundsController {
  constructor(private readonly fundsService: FundsService) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.fundsService.create(createTransactionDto);
  }

  @Get()
  findAll() {
    return this.fundsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.fundsService.findOne(+id);
  }
}
