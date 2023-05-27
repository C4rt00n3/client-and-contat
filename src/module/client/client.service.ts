import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientRepository } from './repository/client.repository';

@Injectable()
export class ClientService {
  constructor(private clientRepository: ClientRepository) {}
  async create(createClientDto: CreateClientDto) {
    return await this.clientRepository.create(createClientDto);
  }

  async findAll() {
    return await this.clientRepository.findAll();
  }

  async findOne(id: string) {
    return await this.clientRepository.findOne(id);
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    return this.clientRepository.update(id, updateClientDto);
  }

  async remove(id: string) {
    return this.clientRepository.remove(id);
  }

  async findByEmail(email: string) {
    return await this.clientRepository.findByEmail(email);
  }
}
