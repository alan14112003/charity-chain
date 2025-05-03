import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CharitiesService } from './charities.service';
import { CreateCharityDto } from './dto/create-charity.dto';
import { UpdateCharityDto } from './dto/update-charity.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('charities')
export class CharitiesController {
  constructor(private readonly charitiesService: CharitiesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createCharityDto: CreateCharityDto) {
    return this.charitiesService.create(createCharityDto);
  }

  @Get()
  findAll() {
    return this.charitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.charitiesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateCharityDto: UpdateCharityDto) {
    return this.charitiesService.update(+id, updateCharityDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.charitiesService.remove(+id);
  }
}
