import { ConflictException, Injectable, UseGuards } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientRepository } from './repository/client.repository';
import { JwtAuthGuard } from '../auth/jwt-guard.auth';

@Injectable()
export class ClientService {
  constructor(private clientRepository: ClientRepository) {}
  @UseGuards(JwtAuthGuard)
  async create(createClientDto: CreateClientDto, userId: string) {
    await this.clientRepository.checkNumber(createClientDto.telephone);

    const checEmil = await this.clientRepository.findByEmail(
      createClientDto.email,
    );

    if (checEmil) {
      throw new ConflictException('User alread exists!');
    }

    return await this.clientRepository.create(createClientDto, userId);
  }

  async findAll(userId: string, query: any) {
    return await this.clientRepository.findAll(userId, query);
  }

  async findOne(id: string, userId: string) {
    return await this.clientRepository.findOne(id, userId);
  }

  async update(id: string, updateClientDto: UpdateClientDto, userId: string) {
    if (updateClientDto.telephone) {
      await this.clientRepository.checkNumber(updateClientDto.telephone);
    }

    return await this.clientRepository.update(id, updateClientDto, userId);
  }

  async remove(id: string, userId: string) {
    await this.clientRepository.checkClientValid(id);
    return this.clientRepository.remove(id, userId);
  }

  async findByEmail(email: string) {
    return await this.clientRepository.findByEmail(email);
  }

  async checkClientValid(id: string) {
    return await this.clientRepository.checkClientValid(id);
  }
}
