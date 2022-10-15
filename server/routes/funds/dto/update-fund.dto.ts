import { PartialType } from "@nestjs/mapped-types";
import { CreateFundDto } from "./create-fund.dto";

export class UpdateFundDto extends PartialType(CreateFundDto) {}
