import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { PrismaService } from 'src/database/prisma.service';
import { ClientRepository } from './repository/client.repository';
import { ClientsPrismaRepository } from './repository/prisma/client-prisma.repository';

@Module({
  controllers: [ClientController],
  providers: [
    ClientService,
    PrismaService,
    {
      provide: ClientRepository,
      useClass: ClientsPrismaRepository,
    },
  ],
  exports: [ClientService],
})
export class ClientModule {}
