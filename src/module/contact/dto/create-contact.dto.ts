import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateContactDto {
  readonly id: string;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  @IsString()
  telephone: string;
  @IsString()
  @IsOptional()
  telegram: string;
  @IsOptional()
  @IsString()
  instagram: string;
}
