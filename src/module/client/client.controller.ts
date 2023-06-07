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
  Query,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { JwtAuthGuard } from '../auth/jwt-guard.auth';
import {
  ApiTags,
  ApiBearerAuth,
  ApiDefaultResponse,
  ApiQuery,
} from '@nestjs/swagger';

const Default = {
  id: '2b65b6ad-6e51-4780-abd1-c3f055a30b34',
  name: 'Eren',
  email: 'eren@mail.com',
  telephone: '77995269395',
  created_at: '2023-05-30T16:45:53.477Z',
  userId: '19a23baa-7f10-4834-a2ce-e9fbdb128a27',
};
@ApiTags('Clients')
@Controller('client')
@ApiBearerAuth()
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiDefaultResponse({
    status: 201,
    schema: {
      default: Default,
    },
  })
  create(@Body() createClientDto: CreateClientDto, @Request() req) {
    console.log(req);
    return this.clientService.create(createClientDto, req.user.id);
  }

  @Get()
  @ApiDefaultResponse({
    status: 201,
    schema: {
      default: {
        next: 'localhost:3000//client?page=2',
        prev: null,
        length: 6,
        data: [Default],
      },
    },
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    description: 'page number',
    example: 1,
    required: false,
  })
  @ApiQuery({
    name: 'count',
    type: Number,
    description: 'must be greater than five and less than ten',
    example: 5,
    required: false,
  })
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req, @Query() query) {
    return this.clientService.findAll(req.user.id, query);
  }

  @Get(':id')
  @ApiDefaultResponse({
    status: 200,
    schema: {
      default: Default,
    },
  })
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string, @Request() req) {
    return this.clientService.findOne(id, req.user.id);
  }

  @Patch(':id')
  @ApiDefaultResponse({
    status: 200,
    schema: {
      default: Default,
    },
  })
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
    @Request() req,
  ) {
    return this.clientService.update(id, updateClientDto, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Request() req) {
    return this.clientService.remove(id, req.user.id);
  }
}
