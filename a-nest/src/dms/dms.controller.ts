import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('api/workspaces/:url/dms')
export class DmsController {
  @Get(':id/chats')
  getChat(@Query() query) {
    console.log(query.perPage, query.page);
  }

  @Post(':id/chats')
  postChat(@Body() body) {}
}
