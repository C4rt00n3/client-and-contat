import { Contact } from '../entities/contact.entity';
import { UpdateContactDto } from '../dto/update-contact.dto';
import { CreateContactDto } from '../dto/create-contact.dto';
import { Pagination } from 'src/module/users/entities/user.entity';

export abstract class ContactRepository {
  abstract create(data: CreateContactDto): Promise<Contact>;
  abstract findAll(query: any): Promise<Contact[] | Pagination>;
  abstract findOne(id: string): Promise<Contact>;
  abstract findByEmail(email: string, clientId: string): Promise<void>;
  abstract findByTelephone(telephone: string, clientId: string): Promise<void>;
  abstract update(id: string, data: UpdateContactDto): Promise<Contact>;
  abstract remove(id: string): Promise<void>;
}
