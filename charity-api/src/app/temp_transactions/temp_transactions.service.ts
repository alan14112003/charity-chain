import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTempTransactionDto } from './dto/create-temp_transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TempTransaction } from './entities/temp_transaction.entity';
import { Repository } from 'typeorm';
import { Program } from '../programs/entities/program.entity';
import { StringUtils } from 'src/utils/string.utils';

@Injectable()
export class TempTransactionsService {
  constructor(
    @InjectRepository(TempTransaction)
    private readonly tempTransactionRepository: Repository<TempTransaction>,
    @InjectRepository(Program)
    private readonly programRepository: Repository<Program>,
  ) {}

  async create(createTempTransactionDto: CreateTempTransactionDto) {
    const tempTransaction = this.tempTransactionRepository.create(
      createTempTransactionDto,
    );

    const program = await this.programRepository.findOne({
      where: { id: createTempTransactionDto.programId },
    });

    if (!program) {
      throw new BadRequestException('Program not found');
    }

    tempTransaction.program = program;
    do {
      tempTransaction.code = StringUtils.generateCode(8);
    } while (
      await this.tempTransactionRepository.findOne({
        where: { code: tempTransaction.code },
      })
    );

    return await this.tempTransactionRepository.save(tempTransaction);
  }

  findByCode(code: string) {
    return this.tempTransactionRepository.findOne({
      where: { code },
      relations: ['program'],
    });
  }

  remove(id: number) {
    return this.tempTransactionRepository.delete(id);
  }
}
