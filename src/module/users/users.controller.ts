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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-guard.auth';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiBearerAuth,
  ApiDefaultResponse,
  ApiQuery,
} from '@nestjs/swagger/dist';

export class UserRole {
  page: 1;
  count: 5;
}

const userDefault = {
  id: 'b3ad37c9-e490-49bc-8ccd-7b7c26f1509b',
  name: 'josé',
  email: 'ze@email.com',
  img_user_src: 'http/exemple.png',
};

@ApiTags('Users')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiDefaultResponse({
    schema: {
      default: userDefault,
    },
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
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
  @ApiDefaultResponse({
    schema: {
      default: {
        next: 'localhost:3000/user?page=2',
        prev: null,
        length: 11,
        data: [
          {
            id: '0fb76562-9163-4521-9d20-9f68f9622cc1',
            name: 'yuri',
            email: 'yuri@email.com',
            password:
              '$2b$10$Z9qAoxX4/QM8Xv0fXXZXregEbSD4mFlu/T7xpaMe8kSWriWwMc05m',
            img_user_src: 'http/exemple.png',
          },
        ],
      },
    },
  })
  findAll(@Query() query = {}) {
    console.log(query);

    return this.usersService.findAll(query);
  }

  @ApiDefaultResponse({
    status: 200,
    schema: {
      default: userDefault,
    },
  })
  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch('')
  @ApiDefaultResponse({
    status: 200,
    schema: {
      default: userDefault,
    },
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  update(@Body() updateUserDto: UpdateUserDto, @Request() req) {
    return this.usersService.update(req.user.id, updateUserDto);
  }

  @Delete()
  @ApiDefaultResponse({
    status: 204,
    schema: null,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  remove(@Request() req) {
    return this.usersService.remove(req.user.id);
  }
}
