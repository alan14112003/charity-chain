import { Module } from '@nestjs/common';
import { CharitiesService } from './charities.service';
import { CharitiesController } from './charities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Charity } from './entities/charity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Charity])],
  controllers: [CharitiesController],
  providers: [CharitiesService],
})
export class CharitiesModule {}
