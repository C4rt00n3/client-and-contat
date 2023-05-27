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
  telegarm: string;
  @IsOptional()
  @IsString()
  instagra: string;
  @IsNotEmpty()
  @IsString()
  client_id: string;
}
