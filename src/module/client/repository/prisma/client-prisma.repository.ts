import { plainToInstance } from 'class-transformer';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateClientDto } from '../../dto/create-client.dto';
import { UpdateClientDto } from '../../dto/update-client.dto';
import { ClientRepository } from '../client.repository';
import { Client } from '../../entities/client.entity';

@Injectable()
export class ClientsPrismaRepository implements ClientRepository {
  constructor(private prisma: PrismaService) {}
  async checkNumber(telephone: string): Promise<void> {
    const checkNumber = await this.prisma.client.findFirst({
      where: {
        telephone,
      },
    });

    if (checkNumber) {
      throw new ConflictException('The phone number is already in use !');
    }
  }
  async create(data: CreateClientDto): Promise<Client> {
    const client = new Client();
    Object.assign(client, { ...data });
    const newClient = await this.prisma.client.create({
      data: {
        ...client,
      },
    });

    return plainToInstance(Client, newClient);
  }

  async findAll(): Promise<Client[]> {
    const clients = await this.prisma.client.findMany();

    return plainToInstance(Client, clients);
  }

  async findOne(id: string): Promise<Client> {
    const client = await this.prisma.client.findUnique({
      where: { id },
    });

    if (!client) {
      throw new NotFoundException('User not found!');
    }
    return plainToInstance(Client, client);
  }

  async findByEmail(email: string): Promise<Client> {
    const client = await this.prisma.client.findFirst({
      where: { email },
    });

    return client;
  }

  async update(id: string, data: UpdateClientDto): Promise<Client> {
    const client = await this.prisma.client.update({
      where: { id },
      data: { ...data },
    });

    return plainToInstance(Client, client);
  }

  async remove(id: string): Promise<void> {
    await this.prisma.client.delete({
      where: {
        id,
      },
    });
  }

  async checkClientValid(id: string): Promise<void> {
    const client = await this.prisma.client.findUnique({
      where: { id: id },
    });
    if (!client) {
      throw new NotFoundException('User not found');
    }
  }
}
