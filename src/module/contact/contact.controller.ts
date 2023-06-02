import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseGuards,
  Param,
  Delete,
  Request,
  Query,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { JwtAuthGuard } from '../auth/jwt-guard.auth';
import {
  ApiTags,
  ApiBearerAuth,
  ApiDefaultResponse,
  ApiQuery,
} from '@nestjs/swagger';

const Default = {
  id: 'bf3e77f0-fd35-4fdb-8a3e-1a96e3f2a2c2',
  name: 'janja',
  email: 'janja@mail.com',
  telephone: '779943487398',
  created_at: '2023-05-30T16:24:43.450Z',
  instagram: null,
  telegram: '77998188355',
  clientId: '5eae681d-65d0-44b4-b0c3-1b30f9c8150e',
};

@ApiTags('Contacts')
@Controller('contact')
@ApiBearerAuth()
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiDefaultResponse({
    status: 200,
    schema: {
      default: Default,
    },
  })
  create(@Body() createContactDto: CreateContactDto, @Request() req) {
    return this.contactService.create(createContactDto, req.user.id);
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
    return this.contactService.findAll(req.user.id, query);
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
    return this.contactService.findOne(id, req.user.id);
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
    @Body() updateContactDto: UpdateContactDto,
    @Request() req,
  ) {
    return this.contactService.update(id, updateContactDto, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Request() req) {
    return this.contactService.remove(id, req.user.id);
  }
}
