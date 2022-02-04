import { Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService {
  constructor(private usersService: UsersService) {}
  async getHello() {
    this.usersService.getUsers();
    this.getWow();
    return process.env.SECRET;
  }
  async getWow() {};
  /*async postUser(): string {
    const user = await User.create();
    return user;
  }*/
}
