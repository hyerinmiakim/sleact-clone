import {
  Controller,
  Get,
  Post,
  Response,
  Body,
  NotFoundException,
  ForbiddenException,
  UseGuards,
} from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '../common/decorators/user.decorator';
import { Users } from '../entities/Users';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';

//@UseInterceptors(UndefindeToNullInterceptor)
@ApiTags('USERS')
@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiCookieAuth('connect.sid')
  @ApiOperation({ summary: '내 정보 조회' })
  @Get()
  async getProfile(@User() user: Users) {
    return user || false;
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  async logIn(@User() user: Users) {
    return user;
  }

  @ApiOperation({ summary: '회원가입' })
  @UseGuards()
  @Post()
  async join(@Body() data: JoinRequestDto) {
    const user = this.usersService.join(
      data.email,
      data.nickname,
      data.password,
    );
    if (!user) {
      throw new NotFoundException();
    }
    const result = await this.usersService.join(
      data.email,
      data.nickname,
      data.password,
    );
    if (result) {
      return 'ok';
    } else {
      throw new ForbiddenException();
    }
  }

  @ApiCookieAuth('connect.sid')
  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  async logOut(@Response() res) {
    res.clearCookie('connect.sid', { httpOnly: true });
    return res.send('ok');
  }
}
