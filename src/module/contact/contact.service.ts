import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactRepository } from './repository/contact.repository';

@Injectable()
export class ContactService {
  constructor(private contactRepository: ContactRepository) {}
  async create(createContactDto: CreateContactDto) {
    return await this.contactRepository.create(createContactDto);
  }

  async findAll() {
    return await this.contactRepository.findAll();
  }

  async findOne(id: string) {
    return await this.contactRepository.findOne(id);
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    return await this.contactRepository.update(id, updateContactDto);
  }

  async remove(id: string) {
    return await this.contactRepository.remove(id);
  }
}
