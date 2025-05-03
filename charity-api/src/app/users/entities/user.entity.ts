import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  fullName: string;
  @Column()
  @Unique(['email'])
  email: string;
  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  address: string;
}
