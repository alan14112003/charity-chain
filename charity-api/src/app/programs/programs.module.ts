import { Module } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { ProgramsController } from './programs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Program } from './entities/program.entity';
import { Charity } from '../charities/entities/charity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Program, Charity])],
  controllers: [ProgramsController],
  providers: [ProgramsService],
})
export class ProgramsModule {}
