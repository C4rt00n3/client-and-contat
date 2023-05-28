import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactRepository } from './repository/contact.repository';

@Injectable()
export class ContactService {
  constructor(private contactRepository: ContactRepository) {}
  async create(createContactDto: CreateContactDto, clientId: string) {
    const { telephone } = createContactDto;
    await this.contactRepository.findByTelephone(telephone, clientId);
    await this.contactRepository.findByEmail(createContactDto.email, clientId);
    return await this.contactRepository.create(createContactDto, clientId);
  }

  async findAll(userId: string) {
    return await this.contactRepository.findAll(userId);
  }

  async findOne(id: string, userId: string) {
    return await this.contactRepository.findOne(id, userId);
  }

  async update(
    id: string,
    updateContactDto: UpdateContactDto,
    clientId: string,
  ) {
    if (updateContactDto.email) {
      await this.contactRepository.findByEmail(
        updateContactDto.email,
        clientId,
      );
    }

    return await this.contactRepository.update(id, updateContactDto, clientId);
  }

  async remove(id: string, clientId: string) {
    return await this.contactRepository.remove(id, clientId);
  }
}
