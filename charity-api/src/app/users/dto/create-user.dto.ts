import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Nguyen Van A', description: 'Họ và tên' })
  @IsString()
  fullName: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Email của người dùng',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Mật khẩu',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: '0312345678',
    description: 'Số điện thoại',
    minLength: 10,
  })
  @IsString()
  @MinLength(10)
  phone: string;

  @ApiProperty({
    example: '123, Đường ABC, Quận 1, TP.HCM',
    description: 'Địa chỉ',
  })
  @IsString()
  address: string;
}
