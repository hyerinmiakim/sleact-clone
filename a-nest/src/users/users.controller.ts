import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  Body,
  UseInterceptors,
} from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';
import { UserDto } from 'src/common/dto/user.dto';
import { UndefindeToNullInterceptor } from 'src/common/interceptors/undefinedToNull.interceptor';
import { Users } from 'src/entities/Users';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';

//@UseInterceptors(UndefindeToNullInterceptor)
@ApiTags('USER')
@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiCookieAuth('connect.sid')
  @ApiOperation({ summary: '내 정보 조회' })
  @Get()
  async getProfile(@User() user: Users) {
    return user || false;
  }

  @ApiOperation({ summary: '회원가입' })
  @Post()
  async join(@Body() data: JoinRequestDto) {
    await this.usersService.join(data.email, data.nickname, data.password);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  logIn(@User() user: Users) {
    return user;
  }

  @ApiCookieAuth('connect.sid')
  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  async logOut(@Res() res) {
    res.clearCookie('connect.sid', { httpOnly: true });
    return res.send('ok');
  }
}
