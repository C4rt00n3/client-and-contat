import { Contact } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { randomUUID } from 'crypto';

export class Client {
  readonly id: string;
  readonly created_at?: Date;

  name: string;
  email: string;
  telephone: string;
  @Exclude()
  password: string;

  contacts?: Contact[];
  constructor() {
    this.id = randomUUID();
  }
}
