import { randomUUID } from 'crypto';

export class Client {
  readonly id: string;
  readonly created_at?: Date;

  name: string;
  email: string;
  telephone: string;
  userId?: string;

  constructor() {
    this.id = randomUUID();
  }
}
