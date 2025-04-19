import { IsNumber, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  accountNumber: string;
  @IsString()
  bankName: string;
  @IsString()
  accountHolder: string;
  @IsNumber()
  amount: number;
  @IsString()
  programCode: string;
}
