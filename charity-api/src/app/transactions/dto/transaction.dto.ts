import { Expose, Transform } from 'class-transformer';

export class TransactionDto {
  @Expose()
  name: string;

  @Expose()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  amount: number;

  @Expose()
  programCode: string;
}
