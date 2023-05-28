import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './module/client/client.module';
import { ContactModule } from './module/contact/contact.module';
import { AuthModule } from './module/auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ClientModule, ContactModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
