import { Expose, Transform } from 'class-transformer';

export class TransactionDto {
  @Expose()
  accountNumber: string;

  @Expose()
  bankName: string;

  @Expose()
  accountHolder: string;

  @Expose()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  amount: number;

  @Expose()
  programCode: string;
}
