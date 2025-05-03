import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'Nguyen Van A',
    description: 'Họ và tên của người dùng',
  })
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Email của người dùng',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'Mật khẩu (tối thiểu 6 ký tự)',
    minLength: 6,
  })
  @IsNotEmpty()
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
