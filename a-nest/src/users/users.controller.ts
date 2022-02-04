import { Controller, Get, Post, Req, Res, Body } from '@nestjs/common';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers(@Req() req) {
    return req.user;
  }

  @Post()
  postUsers(@Body() data: JoinRequestDto) {
    this.usersService.postUsers(data.email, data.nickname, data.password);
  }

  @Post('login')
  logIn(@Req() req) {
    return req.user;
  }
  @Post('logout')
  logOut(@Req() req, @Res() res) {
    req.logout();
    req.clearCookie('connect.sid', { httpOnly: true });
    req.send('ok');
  }
}
