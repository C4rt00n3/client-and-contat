import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactRepository } from './repository/contact.repository';
import { UsersService } from '../users/users.service';

@Injectable()
export class ContactService {
  constructor(
    private contactRepository: ContactRepository,
    private usersService: UsersService,
  ) {}
  async create(createContactDto: CreateContactDto, userId: string) {
    const user = await this.usersService.findOne(userId);
    await this.contactRepository.findByEmail(
      createContactDto.email,
      createContactDto.client_id,
    );
    await this.contactRepository.findByTelephone(
      createContactDto.telephone,
      createContactDto.client_id,
    );

    if (!user) {
      throw new NotFoundException('user not found!');
    }

    return await this.contactRepository.create(createContactDto);
  }

  async findAll(userId: string, query: any) {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException('user not found!');
    }

    return await this.contactRepository.findAll(query);
  }

  async findOne(id: string, userId: string) {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException('user not found!');
    }

    return await this.contactRepository.findOne(id);
  }

  async update(id: string, updateContactDto: UpdateContactDto, userId: string) {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException('user not found!');
    }

    if (updateContactDto.email) {
      await this.contactRepository.findByEmail(
        updateContactDto.email,
        updateContactDto.client_id,
      );
    }

    if (updateContactDto.telephone) {
      await this.contactRepository.findByTelephone(
        updateContactDto.telephone,
        updateContactDto.client_id,
      );
    }

    return await this.contactRepository.update(id, updateContactDto);
  }

  async remove(id: string, userId: string) {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException('user not found!');
    }
    return await this.contactRepository.remove(id);
  }
}
