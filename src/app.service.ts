import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getHello() {
    return process.env.SECRET;
  }
  /*async postUser(): string {
    const user = await User.create();
    return user;
  }*/
}
