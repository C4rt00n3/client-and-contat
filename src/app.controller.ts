import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './module/auth/jwt-guard.auth';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
