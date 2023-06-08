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
import { Pagination } from 'src/module/users/entities/user.entity';
import { UsersService } from 'src/module/users/users.service';

@Injectable()
export class ClientsPrismaRepository implements ClientRepository {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
  ) {}
  async checkNumber(telephone: string, userId: string): Promise<void> {
    const checkNumber = await this.prisma.client.findFirst({
      where: {
        telephone,
        userId,
      },
    });

    if (checkNumber) {
      throw new ConflictException('The phone number is already in use !');
    }
  }

  async create(data: CreateClientDto, userId: string): Promise<Client> {
    const client = new Client();
    Object.assign(client, data);

    const newClient = await this.prisma.client.create({
      data: {
        id: client.id,
        email: client.email,
        name: client.name,
        telephone: client.telephone,
        created_at: client.created_at,
        img_client_src: client.img_client_src || '',
        userId,
      },
    });

    return newClient;
  }

  async findAll(userId: string, query: any): Promise<Client[] | Pagination> {
    const clients = await this.prisma.client.findMany({
      where: {
        userId,
      },
      include: { user: true },
    });

    if (query.page) {
      const take = Math.abs(
        +query.count <= 10 && +query.count >= 5 ? +query.count : 5,
      );

      const page = Math.abs(+query.page <= 1 ? 0 : +query.page);

      const skip = Math.abs(page * take - take);

      const usePage = await this.prisma.client.findMany({
        skip: page > 1 ? skip : page,
        take: take || 5,
        where: { userId },
      });

      return this.usersService.pagination(usePage, '/client', query, clients);
    }

    return clients;
  }

  async findOne(id: string, userId: string): Promise<Client> {
    const client = await this.prisma.client.findFirst({
      where: { id, userId },
    });

    if (!client) {
      throw new NotFoundException('Client not found!');
    }
    return client;
  }

  async findByEmail(email: string, userId?: string): Promise<Client> {
    const client = await this.prisma.client.findFirst({
      where: { email, userId },
    });

    return client;
  }

  async update(
    id: string,
    data: UpdateClientDto,
    userId: string,
  ): Promise<Client> {
    const checcUser = await this.prisma.client.findFirst({
      where: { id, userId },
    });

    if (!checcUser) {
      throw new NotFoundException('Client Not found');
    }

    console.log(checcUser);

    const client = await this.prisma.client.update({
      where: { id },
      data: { ...data },
    });

    return client;
  }

  async remove(id: string, userId: string): Promise<void> {
    const checcUser = await this.prisma.client.findFirst({
      where: { id, userId },
    });

    if (!checcUser) {
      throw new NotFoundException('Client Not found');
    }

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
      throw new NotFoundException('Client not found');
    }
  }
}
