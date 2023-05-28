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

@Injectable()
export class ContactPrismaRepository implements ContactRepository {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateContactDto, id: string): Promise<Contact> {
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
        clientId: id,
      },
    });

    return plainToInstance(Contact, newContact);
  }

  async findAll(clientId: string): Promise<Contact[]> {
    const contact = await this.prisma.contact.findMany({
      where: {
        clientId,
      },
    });
    return plainToInstance(Contact, contact);
  }

  async findOne(id: string, clientId: string): Promise<Contact> {
    const contact = await this.prisma.contact.findFirst({
      where: { id, clientId },
    });

    if (!contact) {
      throw new NotFoundException('Contact not found!');
    }

    return plainToInstance(Contact, contact);
  }

  async findByEmail(email: string, clientId: string): Promise<void> {
    const contact = await this.prisma.contact.findFirst({
      where: { clientId, email },
    });

    if (contact) {
      throw new ConflictException('Contact alread exists!');
    }
  }

  async update(
    id: string,
    data: UpdateContactDto,
    clientId: string,
  ): Promise<Contact> {
    const checkClient = await this.prisma.contact.findFirst({
      where: {
        id: id,
        clientId,
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

  async remove(id: string, clientId: string): Promise<void> {
    const contact = await this.prisma.contact.findFirst({
      where: {
        id,
        clientId,
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
