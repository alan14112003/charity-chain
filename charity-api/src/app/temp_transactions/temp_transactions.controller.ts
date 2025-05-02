import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TempTransactionsService } from './temp_transactions.service';
import { CreateTempTransactionDto } from './dto/create-temp_transaction.dto';

@Controller('temp-transactions')
export class TempTransactionsController {
  constructor(
    private readonly tempTransactionsService: TempTransactionsService,
  ) {}

  @Post()
  create(@Body() createTempTransactionDto: CreateTempTransactionDto) {
    return this.tempTransactionsService.create(createTempTransactionDto);
  }

  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.tempTransactionsService.findByCode(code);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tempTransactionsService.remove(+id);
  }
}
