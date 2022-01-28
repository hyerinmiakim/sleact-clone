import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// 공통 주소
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // 메소드 주소
  @Get()
  getHello() {
    return this.appService.getHello();
  }

  /*@Post()
  postUser(): string {
    return this.appService.postUser();
  }*/
}
