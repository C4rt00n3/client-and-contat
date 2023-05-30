import { plainToInstance } from 'class-transformer';
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ContactRepository } from '../contact.repository';
import { CreateContactDto } from '../../dto/create-contact.dto';
import { Contact } from '../../entities/contact.entity';
import { UpdateContactDto } from '../../dto/update-contact.dto';
import { UsersService } from 'src/module/users/users.service';
import { Pagination } from 'src/module/users/entities/user.entity';

@Injectable()
export class ContactPrismaRepository implements ContactRepository {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
  ) {}
  async create(data: CreateContactDto): Promise<Contact> {
    const contact = new Contact();

    Object.assign(contact, { ...data });

    const newContact = await this.prisma.contact.create({
      data: {
        id: contact.id,
        name: contact.name,
        email: contact.email,
        telephone: contact.telephone,
        created_at: contact.created_at,
        instagram: contact.instagram,
        telegram: contact.telegram,
        clientId: contact.client_id,
      },
    });

    return plainToInstance(Contact, newContact);
  }

  async findAll(query: any): Promise<Contact[] | Pagination> {
    const contact = await this.prisma.contact.findMany();

    if (query.page) {
      const take = Math.abs(
        +query.count <= 10 && +query.count >= 5 ? +query.count : 5,
      );
      const page = Math.abs(+query.page <= 1 ? 0 : +query.page);

      const skip = Math.abs(page * take - take);

      const contactQuery = await this.prisma.contact.findMany({
        skip: page > 1 ? skip : page,
        take: take || 5,
      });

      const pagination = await this.usersService.pagination(
        contactQuery,
        '/client',
        query,
        contact,
      );

      return pagination;
    }

    return plainToInstance(Contact, contact);
  }

  async findOne(id: string): Promise<Contact> {
    const contact = await this.prisma.contact.findFirst({
      where: { id },
    });

    if (!contact) {
      throw new NotFoundException('Contact not found!');
    }

    return plainToInstance(Contact, contact);
  }

  async findByEmail(email: string, clientId: string): Promise<void> {
    const contact = await this.prisma.contact.findFirst({
      where: { email, clientId },
    });

    if (contact) {
      throw new ConflictException('Email alread exists!');
    }
  }

  async update(id: string, data: UpdateContactDto): Promise<Contact> {
    const checkClient = await this.prisma.contact.findFirst({
      where: {
        id: id,
      },
    });

    if (!checkClient) {
      throw new NotFoundException('Contact found!');
    }

    const contact = await this.prisma.contact.update({
      where: { id },
      data: data,
    });

    return plainToInstance(Contact, contact);
  }

  async remove(id: string): Promise<void> {
    const contact = await this.prisma.contact.findFirst({
      where: {
        id,
      },
    });

    if (!contact) {
      throw new NotFoundException('Contact found!');
    }

    await this.prisma.contact.delete({
      where: {
        id,
      },
    });
  }

  async findByTelephone(telephone: string, clientId: string): Promise<void> {
    const contact = await this.prisma.contact.findFirst({
      where: { telephone, clientId },
    });

    if (contact) {
      throw new ConflictException('Telephone alread exists!');
    }
  }
}
