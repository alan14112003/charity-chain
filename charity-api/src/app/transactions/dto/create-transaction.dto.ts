import { IsNumber, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  name: string;
  @IsNumber()
  amount: number;
  @IsString()
  code: string;
}
