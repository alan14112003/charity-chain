import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Program } from './entities/program.entity';
import { Charity } from '../charities/entities/charity.entity';
import { StringUtils } from 'src/utils/string.utils';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectRepository(Program)
    private readonly programRepository: Repository<Program>,
    @InjectRepository(Charity)
    private readonly charityRepository: Repository<Charity>,
  ) {}

  async create(createProgramDto: CreateProgramDto) {
    const program = this.programRepository.create(createProgramDto);
    const charity = await this.charityRepository.findOne({
      where: { id: createProgramDto.charityId },
    });

    if (!charity) {
      throw new BadRequestException('Charity not found');
    }

    program.charity = charity;
    do {
      program.code = StringUtils.generateCode(8);
    } while (
      await this.programRepository.findOne({ where: { code: program.code } })
    );
    return this.programRepository.save(program);
  }

  findAll() {
    return this.programRepository.find({
      relations: ['charity'],
    });
  }

  findOne(id: number) {
    return this.programRepository.findOne({
      where: { id },
      relations: ['charity'],
    });
  }

  async update(id: number, updateProgramDto: UpdateProgramDto) {
    const program = await this.programRepository.findOne({
      where: { id },
      relations: ['charity'],
    });
    if (!program) return null;

    const updateData: any = { ...updateProgramDto };

    if (
      updateProgramDto.charityId &&
      program.charity.id !== updateProgramDto.charityId
    ) {
      const charity = await this.charityRepository.findOneBy({
        id: updateProgramDto.charityId,
      });
      updateData.charity = charity;
    }

    delete updateData.charityId;
    return this.programRepository.update(id, updateData);
  }

  remove(id: number) {
    return this.programRepository.delete(id);
  }
}
