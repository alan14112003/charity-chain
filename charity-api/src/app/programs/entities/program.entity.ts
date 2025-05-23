import { Charity } from 'src/app/charities/entities/charity.entity';
import { TempTransaction } from 'src/app/temp_transactions/entities/temp_transaction.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Program {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({
    type: 'text',
  })
  descriptions: string;
  @Column({
    nullable: true,
    default: 0,
  })
  total: number;

  @Column({
    default: 0,
    nullable: true,
  })
  donateCount: number;

  @Column({
    nullable: true,
  })
  target: number;

  @Column()
  avatar: string;

  @Column({
    unique: true,
  })
  code: string;

  @ManyToOne(() => Charity, (charity) => charity.programs, {
    onDelete: 'CASCADE',
  })
  charity: Charity;

  @OneToMany(
    () => TempTransaction,
    (tempTransaction) => tempTransaction.program,
  )
  tempTransactions: TempTransaction[];
}
