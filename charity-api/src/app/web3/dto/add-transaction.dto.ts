import { IsNumber, IsString } from 'class-validator';

export class AddTransactionDto {
  @IsString()
  name: string;
  @IsNumber()
  amount: number;
  @IsString()
  programCode: string;

  constructor(name: string, amount: number, programCode: string) {
    this.name = name;
    this.amount = amount;
    this.programCode = programCode;
  }
}
