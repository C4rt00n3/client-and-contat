import { ConflictException, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientRepository } from './repository/client.repository';

@Injectable()
export class ClientService {
  constructor(private clientRepository: ClientRepository) {}

  async create(createClientDto: CreateClientDto) {
    await this.clientRepository.checkNumber(createClientDto.telephone);

    const checEmil = await this.clientRepository.findByEmail(
      createClientDto.email,
    );

    if (checEmil) {
      throw new ConflictException('User alread exists!');
    }

    return await this.clientRepository.create(createClientDto);
  }

  async findAll(userId: string) {
    await this.clientRepository.checkClientValid(userId);
    return await this.clientRepository.findAll();
  }

  async findOne(id: string, userId: string) {
    await this.clientRepository.checkClientValid(userId);
    return await this.clientRepository.findOne(id);
  }

  async update(id: string, updateClientDto: UpdateClientDto, email: string) {
    await this.clientRepository.checkClientValid(id);
    if (updateClientDto.email && email !== updateClientDto.email) {
      const checEmil = await this.clientRepository.findByEmail(
        updateClientDto.email,
      );

      if (checEmil) {
        throw new ConflictException('Email in use');
      }
    }

    if (updateClientDto.telephone) {
      await this.clientRepository.checkNumber(updateClientDto.telephone);
    }

    return this.clientRepository.update(id, updateClientDto);
  }

  async remove(id: string) {
    await this.clientRepository.checkClientValid(id);
    return this.clientRepository.remove(id);
  }

  async findByEmail(email: string) {
    return await this.clientRepository.findByEmail(email);
  }

  async checkClientValid(id: string) {
    return await this.clientRepository.checkClientValid(id);
  }
}
