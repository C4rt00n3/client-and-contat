import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { PrismaService } from 'src/database/prisma.service';
import { ClientRepository } from './repository/client.repository';
import { ClientsPrismaRepository } from './repository/prisma/client-prisma.repository';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [ClientController],
  providers: [
    ClientService,
    PrismaService,
    {
      provide: ClientRepository,
      useClass: ClientsPrismaRepository,
    },
  ],
})
export class ClientModule {}
