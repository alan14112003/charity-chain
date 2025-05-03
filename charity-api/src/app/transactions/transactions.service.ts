import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { plainToClass } from 'class-transformer';
import { TransactionDto } from './dto/transaction.dto';
import { Web3Service } from '../web3/web3.service';
import { AddTransactionDto } from '../web3/dto/add-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { TempTransaction } from '../temp_transactions/entities/temp_transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @Inject() private readonly web3Service: Web3Service,
    @InjectRepository(TempTransaction)
    private readonly tempTransactionRepository: Repository<TempTransaction>,
  ) {}
  async create(createTransactionDto: CreateTransactionDto) {
    const queryRunner: QueryRunner =
      this.tempTransactionRepository.manager.connection.createQueryRunner();

    // Bắt đầu transaction
    await queryRunner.startTransaction();

    try {
      const tempTransaction = await this.tempTransactionRepository.findOne({
        where: { code: createTransactionDto.code },
        relations: ['program'],
      });

      if (!tempTransaction) {
        throw new NotFoundException('Program not found');
      }

      const program = tempTransaction.program;
      program.total = program.total + createTransactionDto.amount;
      program.donateCount++;
      await queryRunner.manager.save(program);

      await this.web3Service.addTransfer(
        new AddTransactionDto(
          tempTransaction.name,
          createTransactionDto.amount,
          program.code,
        ),
      );

      // Xóa tempTransaction sau khi đã xử lý
      await queryRunner.manager.delete(TempTransaction, tempTransaction.id);

      await queryRunner.commitTransaction();
      return { message: 'Thành công' };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
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
      programCode,
    );

    if (data.length === 0) {
      return [];
    }

    const transformedData = data.map((item) =>
      plainToClass(TransactionDto, item, { excludeExtraneousValues: true }),
    );

    return transformedData;
  }
}
