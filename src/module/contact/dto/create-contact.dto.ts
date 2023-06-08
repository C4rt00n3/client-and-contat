import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateContactDto {
  readonly id: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'name contact',
    type: String,
    default: 'Rafael felipe',
    maximum: 50,
  })
  name: string;

  @ApiProperty({
    description: 'contact email',
    type: String,
    default: 'rafael@mail.com',
    maximum: 120,
  })
  @Length(0, 120)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'contact telephone',
    type: String,
    default: '77999111000',
    maximum: 15,
    minimum: 9,
  })
  @IsNotEmpty()
  @IsString()
  @Length(9, 15)
  telephone: string;

  @ApiPropertyOptional({
    description: 'contact telegram',
    type: String,
    default: '77999111000',
    maximum: 15,
    minimum: 9,
  })
  @IsString()
  @IsOptional()
  telegram: string;
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'contact instagram',
    type: String,
    default: 'exemple',
    maximum: 30,
  })
  instagram: string;
  @ApiProperty({
    description: 'client id',
    type: String,
    default: '0fb76562-9163-4521-9d20-9f68f9622cc1',
  })
  @Length(0, 50)
  @IsString()
  @IsNotEmpty()
  client_id: string;
}
