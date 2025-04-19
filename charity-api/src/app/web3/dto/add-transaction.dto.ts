import { IsNumber, IsString } from 'class-validator';

export class AddTransactionDto {
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

  constructor(
    accountNumber: string,
    bankName: string,
    accountHolder: string,
    amount: number,
    programCode: string,
  ) {
    this.accountNumber = accountNumber;
    this.bankName = bankName;
    this.accountHolder = accountHolder;
    this.amount = amount;
    this.programCode = programCode;
  }
}
