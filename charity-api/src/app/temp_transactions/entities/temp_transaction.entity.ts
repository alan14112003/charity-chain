import { Program } from 'src/app/programs/entities/program.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TempTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  code: string;

  @ManyToOne(() => Program, (program) => program.tempTransactions, {
    onDelete: 'CASCADE',
  })
  program: Program;
}
