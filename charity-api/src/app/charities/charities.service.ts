import { Injectable } from '@nestjs/common';
import { CreateCharityDto } from './dto/create-charity.dto';
import { UpdateCharityDto } from './dto/update-charity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Charity } from './entities/charity.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CharitiesService {
  constructor(
    @InjectRepository(Charity)
    private readonly charityRepository: Repository<Charity>,
  ) {}

  create(createCharityDto: CreateCharityDto) {
    const charity = this.charityRepository.create(createCharityDto);
    return this.charityRepository.save(charity);
  }

  findAll() {
    return this.charityRepository.find();
  }

  findOne(id: number) {
    return this.charityRepository.findOne({ where: { id } });
  }

  async update(id: number, updateCharityDto: UpdateCharityDto) {
    const charity = await this.charityRepository.findOne({ where: { id } });
    if (!charity) {
      return null;
    }
    Object.assign(charity, updateCharityDto);
    return this.charityRepository.save(charity);
  }

  remove(id: number) {
    return this.charityRepository.delete(id);
  }
}
