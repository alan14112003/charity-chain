import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { Web3Module } from '../web3/web3.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TempTransaction } from '../temp_transactions/entities/temp_transaction.entity';

@Module({
  imports: [Web3Module, TypeOrmModule.forFeature([TempTransaction])],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
