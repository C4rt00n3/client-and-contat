import { Pagination } from 'src/module/users/entities/user.entity';
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { Client } from '../entities/client.entity';

export abstract class ClientRepository {
  abstract create(data: CreateClientDto, userId: string): Promise<Client>;
  abstract findAll(userId: string, query: any): Promise<Client[] | Pagination>;
  abstract findOne(id: string, userId: string): Promise<Client>;
  abstract findByEmail(
    email: string,
    userId?: string,
  ): Promise<Client> | Client;
  abstract update(
    id: string,
    data: UpdateClientDto,
    userId: string,
  ): Promise<Client>;
  abstract remove(id: string, userId: string): Promise<void>;
  abstract checkNumber(telephone: string, userId: string): Promise<void>;
  abstract checkClientValid(id: string): Promise<void>;
}
