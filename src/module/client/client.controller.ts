import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { JwtAuthGuard } from '../auth/jwt-guard.auth';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto, @Request() req) {
    return this.clientService.create(createClientDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req) {
    return this.clientService.findAll(req.user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string, @Request() req) {
    return this.clientService.findOne(id, req.user.id);
  }

  @Patch('')
  @UseGuards(JwtAuthGuard)
  update(@Body() updateClientDto: UpdateClientDto, @Request() req) {
    return this.clientService.update(
      req.user.id,
      updateClientDto,
      req.user.email,
    );
  }

  @Delete('')
  @UseGuards(JwtAuthGuard)
  remove(@Request() req) {
    return this.clientService.remove(req.user.id);
  }
}
