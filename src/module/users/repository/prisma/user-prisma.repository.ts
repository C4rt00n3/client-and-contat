import { CreateUserDto } from 'src/module/users/dto/create-user.dto';
import { Pagination, User } from 'src/module/users/entities/user.entity';
import { UsersRepository } from '../user.repository';
import { PrismaService } from 'src/database/prisma.service';
import { plainToInstance } from 'class-transformer';
import { UpdateUserDto } from 'src/module/users/dto/update-user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersPrismaRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    const user = new User();
    Object.assign(user, data);

    const newUser = await this.prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        img_user_src: user.img_user_src || '',
        password: user.password,
      },
    });

    return plainToInstance(User, newUser);
  }

  async pagination(data: any[], resUrl: string, query: any, arrayComp: any[]) {
    const pagination = new Pagination();

    const next = `${process.env.BASE_URL}/${resUrl}?page=${+query.page + 1}`;
    const prev = `${process.env.BASE_URL}/${resUrl}?page=${+query.page - 1}`;

    const checkNext = () => {
      const page = +query.page <= 1 ? 0 : +query.page;
      const calc = data.length * page;
      const take = +query.count || 5;

      console.log(calc, arrayComp.length - 1);

      if (arrayComp.length < take) {
        return null;
      }

      if (calc >= arrayComp.length - 1 || page == 0 || page == 1) {
        return next;
      }

      return null;
    };

    Object.assign(pagination, {
      next: checkNext(),
      prev: +query.page >= 2 ? prev : null,
      length: arrayComp.length,
      data: data,
    });

    return pagination;
  }

  async findAll(query: any): Promise<Pagination | User[]> {
    const user = await this.prisma.user.findMany();

    if (query.page) {
      const take = Math.abs(
        +query.count <= 10 && +query.count >= 5 ? +query.count : 5,
      );
      const page = Math.abs(+query.page <= 1 ? 0 : +query.page);

      const skip = Math.abs(page * take - take);

      const userPage = await this.prisma.user.findMany({
        skip: page > 1 ? skip : page,

        take: take || 5,
      });

      return this.pagination(userPage, 'user', query, user);
    }

    return plainToInstance(User, user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });

    return user;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { id },
    });

    return user;
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id },
      data: { ...data },
    });

    return plainToInstance(User, user);
  }

  async remove(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
