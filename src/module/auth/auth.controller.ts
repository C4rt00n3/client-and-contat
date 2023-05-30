import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { ApiCreatedResponse, ApiDefaultResponse } from '@nestjs/swagger/dist';

class ClientLogin {
  @ApiProperty({
    description: 'email',
    type: String,
  })
  email: string;
  @ApiProperty({
    description: 'email',
    type: String,
    minimum: 8,
    maximum: 120,
  })
  password: string;
}

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('')
  @ApiTags('Login')
  @ApiCreatedResponse({ description: 'Return user token' })
  @ApiDefaultResponse({
    schema: {
      default: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhZmFAZW1haWwuY29tIiwiaWF0IjoxNjg1Mzk4NzQwLCJleHAiOjE2ODU0ODUxNDAsInN1YiI6IjE5YTIzYmFhLTdmMTAtNDgzNC1hMmNlLWU5ZmJkYjEyOGEyNyJ9.AJ8Jc0fNwWOBXSqxxwy9CAm_cui15UsQBYwufAhezsc',
      },
    },
  })
  @UseGuards(LocalAuthGuard)
  async login(@Body() client: ClientLogin) {
    return await this.authService.login(client.email);
  }
}
