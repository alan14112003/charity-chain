import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { Web3Module } from '../web3/web3.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Program } from '../programs/entities/program.entity';

@Module({
  imports: [Web3Module, TypeOrmModule.forFeature([Program])],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
