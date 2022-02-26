import {
  BadRequestException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/Users';
import { Connection, Repository } from 'typeorm';
import { bcrypt } from 'bcrypt';
import { WorkspaceMembers } from '../entities/WorkspaceMembers';
import { ChannelMembers } from '../entities/ChannelMembers';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}
  async findByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });
  }

  async join(email: string, nickname: string, password: string) {
    if (!email) {
      throw new HttpException('이메일이 없다.', 400);
      return;
    }
    if (!nickname) {
      throw new HttpException('닉네임이 없다.', 400);
      return;
    }
    if (!password) {
      throw new BadRequestException('비밀번호 오류.'); //자동으로 400코드 넘겨줌
      return;
    }
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user) {
      throw new UnauthorizedException('이미 존재하는 사용자입니다.'); // 자동으로 401을 넘겨줌
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await this.usersRepository.save({
      email,
      nickname,
      password: hashedPassword,
    });
    return true;
  }
}
