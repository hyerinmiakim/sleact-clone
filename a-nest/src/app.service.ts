import { Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService {
  constructor(private usersService: UsersService) {}
  async getHello(): Promise<string> {
    return process.env.SECRET;
  }
  async postUser(): Promise<string> {
    return 'hello post';
  }
}
