import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repository/user.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}
  async create(createUserDto: CreateUserDto) {
    const checkEmail = await this.usersRepository.findByEmail(
      createUserDto.email,
    );

    if (checkEmail) {
      throw new ConflictException('Email aleady exists!');
    }

    return await this.usersRepository.create(createUserDto);
  }

  async findAll(query: any) {
    return await this.usersRepository.findAll(query);
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findByEmail(email);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.email) {
      const checkEmail = await this.usersRepository.findByEmail(
        updateUserDto.email,
      );

      if (checkEmail) {
        throw new ConflictException('Email aleady exists!');
      }
    }

    return await this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return await this.usersRepository.remove(id);
  }

  async pagination(data: any[], resUrl: string, query: any, arrayComp: any[]) {
    return await this.usersRepository.pagination(
      data,
      resUrl,
      query,
      arrayComp,
    );
  }
}
