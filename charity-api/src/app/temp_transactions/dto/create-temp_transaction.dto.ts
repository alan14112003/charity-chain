import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateTempTransactionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  programId: number;
}
