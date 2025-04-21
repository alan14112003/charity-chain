import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCharityDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  detail: string;

  @IsNotEmpty()
  @IsString()
  avatar: string;

  @IsNotEmpty()
  @IsString()
  qr_code: string;
}
