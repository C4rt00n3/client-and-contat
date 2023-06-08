import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  readonly id: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'name client',
    type: String,
    default: 'Rafael felipe',
    maximum: 50,
  })
  @Length(0, 50)
  name: string;
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'client email',
    type: String,
    default: 'rafael@mail.com',
    maximum: 120,
  })
  email: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'client telephone',
    type: String,
    default: '77999111000',
    maximum: 15,
    minimum: 9,
  })
  @Length(9, 15)
  telephone: string;
  @IsString()
  @IsOptional()
  img_client_src?: string;

  @IsString()
  @ApiProperty({
    description: 'client img',
    type: String,
    default: 'http/exemple',
  })
  @IsOptional()
  img_client_src: string;

  readonly create_at?: Date;
}
