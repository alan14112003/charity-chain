import { Program } from 'src/app/programs/entities/program.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Charity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({
    type: 'text',
  })
  detail: string;
  @Column()
  avatar: string;

  @Column()
  qr_code: string;

  @OneToMany(() => Program, (program) => program.charity)
  programs: Program[];
}
