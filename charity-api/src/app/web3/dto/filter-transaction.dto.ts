// src/web3/dto/filter-transfer.dto.ts
import { IsOptional, IsString, IsNumber, IsPositive } from 'class-validator';

export class FilterTransactionDto {
  @IsOptional()
  @IsString()
  accountNumber?: string;

  @IsOptional()
  @IsString()
  bankName?: string;

  @IsOptional()
  @IsString()
  accountHolder?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  amount?: number;

  @IsOptional()
  @IsString()
  programCode?: string;
}
