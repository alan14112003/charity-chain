import { Inject, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { plainToClass } from 'class-transformer';
import { TransactionDto } from './dto/transaction.dto';
import { Web3Service } from '../web3/web3.service';
import { AddTransactionDto } from '../web3/dto/add-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(@Inject() private readonly web3Service: Web3Service) {}
  async create(createTransactionDto: CreateTransactionDto) {
    return await this.web3Service.addTransfer(
      new AddTransactionDto(
        createTransactionDto.accountNumber,
        createTransactionDto.bankName,
        createTransactionDto.accountHolder,
        createTransactionDto.amount,
        createTransactionDto.programCode,
      ),
    );
  }

  async findAll() {
    const data = await this.web3Service.getAllTransfers();
    const transformedData = data.map((item) =>
      plainToClass(TransactionDto, item, { excludeExtraneousValues: true }),
    );

    return transformedData;
  }

  async findByProgramCode(programCode: string) {
    const data = await this.web3Service.filterTransfers(
      undefined,
      undefined,
      undefined,
      undefined,
      programCode,
    );

    if (data.length === 0) {
      return null;
    }

    const transformedData = data.map((item) =>
      plainToClass(TransactionDto, item, { excludeExtraneousValues: true }),
    );

    return transformedData;
  }
}
