import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import { bcrypt } from 'bcrypt';

@Injectable()
export class UsersService {
  join(email: string, nickname: string, password: string) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}
  getUsers() {}
  async postUsers(email: string, nickname: string, password: string) {
    if (!email) {
      // 이메일 없다고 에러
      throw new HttpException('이메일이 없다.', 400);
      return;
    }
    if (!nickname) {
      throw new HttpException('닉네임이 없다.', 400);
      return;
    }
    if (!password) {
      throw new HttpException('비밀번호 오류.', 400);
      return;
    }
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user) {
      // 이미 존재하는 유저라고 에러 뜨는곳
      throw new Error('이미 존재하는 사용자입니다.');
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await this.usersRepository.save({
      email,
      nickname,
      password: hashedPassword,
    });
  }
}
