import { Module } from '@nestjs/common';
import { TempTransactionsService } from './temp_transactions.service';
import { TempTransactionsController } from './temp_transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TempTransaction } from './entities/temp_transaction.entity';
import { Program } from '../programs/entities/program.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TempTransaction, Program])],
  controllers: [TempTransactionsController],
  providers: [TempTransactionsService],
})
export class TempTransactionsModule {}
