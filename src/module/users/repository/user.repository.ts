import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Pagination, User } from '../entities/user.entity';

export abstract class UsersRepository {
  abstract create(data: CreateUserDto): Promise<User>;
  abstract findAll(query: any): Promise<Pagination | User[]> | Pagination;
  abstract findOne(id: string): Promise<User>;
  abstract findByEmail(email: string): Promise<User>;
  abstract update(id: string, data: UpdateUserDto): Promise<User>;
  abstract remove(user: User): Promise<void>;
  abstract pagination(
    data: any[],
    resUrl: string,
    query: any,
    user: User[],
  ): Promise<Pagination>;
}
