import { Injectable } from '@nestjs/common';
import { ClientService } from '../client/client.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private clientService: ClientService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const client = await this.clientService.findByEmail(email);
    if (client) {
      const passwordMatch = compareSync(password, client.password);
      if (passwordMatch) {
        return { email: client.email };
      }
    }
    return null;
  }

  async login(email: string) {
    const user = await this.clientService.findByEmail(email);
    return {
      token: this.jwtService.sign({ email }, { subject: user.id }),
    };
  }
}
