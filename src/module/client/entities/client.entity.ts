import { randomUUID } from 'crypto';

export class Client {
  readonly id: string;
  readonly created_at?: Date;

  name: string;
  email: string;
  telephone: string;
  userId?: string;
  img_client_src?: string;

  constructor() {
    this.id = randomUUID();
  }
}
