import { plainToInstance } from 'class-transformer';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ContactRepository } from '../contact.repository';
import { CreateContactDto } from '../../dto/create-contact.dto';
import { Contact } from '../../entities/contact.entity';
import { UpdateContactDto } from '../../dto/update-contact.dto';

@Injectable()
export class ContactPrismaRepository implements ContactRepository {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateContactDto): Promise<Contact> {
    console.log(data);
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
        telegarm: contact.telegarm,
        cleintId: contact.client_id,
      },
    });

    return plainToInstance(Contact, newContact);
  }

  async findAll(): Promise<Contact[]> {
    const contact = await this.prisma.contact.findMany();
    return plainToInstance(Contact, contact);
  }

  async findOne(id: string): Promise<Contact> {
    const contact = await this.prisma.contact.findUnique({
      where: { id },
    });

    return plainToInstance(Contact, contact);
  }

  async findByEmail(email: string): Promise<Contact> {
    const contact = await this.prisma.contact.findFirst({
      where: { email },
    });

    return contact;
  }

  async update(id: string, data: UpdateContactDto): Promise<Contact> {
    const contact = await this.prisma.contact.update({
      where: { id },
      data: { ...data },
    });

    return plainToInstance(Contact, contact);
  }

  async remove(id: string): Promise<void> {
    await this.prisma.contact.delete({
      where: {
        id,
      },
    });
  }
}
