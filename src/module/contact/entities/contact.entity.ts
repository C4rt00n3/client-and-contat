import { randomUUID } from 'crypto';

export class Contact {
  readonly id: string;
  name: string;
  email: string;
  telephone: string;
  instagram?: string;
  telegarm?: string;
  client_id?: string;
  readonly created_at: Date;

  constructor() {
    this.id = randomUUID();
  }
}
