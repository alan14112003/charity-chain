import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProgramDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  descriptions: string;

  @IsOptional()
  @IsNumber()
  total?: number;

  @IsOptional()
  @IsNumber()
  donateCount?: number;

  @IsOptional()
  @IsNumber()
  target?: number;

  @IsNotEmpty()
  @IsString()
  avatar: string;

  @IsNotEmpty()
  @IsNumber()
  charityId: number;
}
