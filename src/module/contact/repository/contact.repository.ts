import { Contact } from '../entities/contact.entity';
import { UpdateContactDto } from '../dto/update-contact.dto';
import { CreateContactDto } from '../dto/create-contact.dto';

export abstract class ContactRepository {
  abstract create(data: CreateContactDto, id: string): Promise<Contact>;
  abstract findAll(userId: string): Promise<Contact[]>;
  abstract findOne(id: string, userId: string): Promise<Contact>;
  abstract findByEmail(email: string, clientId: string): Promise<void>;
  abstract findByTelephone(telephone: string, clientId: string): Promise<void>;
  abstract update(
    id: string,
    data: UpdateContactDto,
    clientId: string,
  ): Promise<Contact> | Contact;
  abstract remove(id: string, clientId: string): Promise<void>;
}
