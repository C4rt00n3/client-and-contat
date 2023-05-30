import { Exclude } from 'class-transformer';
import { randomUUID } from 'crypto';

export class User {
  readonly id?: string;
  readonly created_at?: Date;
  name: string;
  email: string;
  img_user_src?: string;

  @Exclude()
  password: string;

  constructor() {
    this.id = randomUUID();
  }
}

export class Pagination {
  next: string | null;
  prev: string | null;
  length: number;
  data: any[];
}
