import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { PrismaService } from 'src/database/prisma.service';
import { ContactRepository } from './repository/contact.repository';
import { ContactPrismaRepository } from './repository/prisma/contact-prisma.repository';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [ContactController],
  providers: [
    ContactService,
    PrismaService,
    {
      provide: ContactRepository,
      useClass: ContactPrismaRepository,
    },
  ],
})
export class ContactModule {}
