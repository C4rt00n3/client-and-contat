import { hashSync } from 'bcrypt';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  readonly id?: string;
  readonly created_at?: Date;

  @ApiProperty({
    description: 'Username',
    type: String,
    default: 'Rafael felipe',
    maximum: 50,
  })
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty({
    description: 'user email',
    type: String,
    default: 'rafael@mail.com',
    maximum: 120,
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @ApiPropertyOptional({
    description: 'image user',
    type: String,
    default: 'http/exemple.png',
  })
  @IsOptional()
  img_user_src?: string;

  @ApiProperty({
    description: 'user password',
    type: String,
    default: '12aB@3456',
    maximum: 120,
    minimum: 8,
  })
  @IsNotEmpty()
  @Length(8, 120)
  @Transform(({ value }: { value: string }) => hashSync(value, 10), {
    groups: ['transform'],
  })
  password: string;
}
