import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('DM') // Groupping
@Controller('api/workspaces/:url/dms')
export class DmsController {
  @ApiParam({
    name: 'url',
    required: true,
    description: '워크스페이스 url',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: '사용자 ID',
  })
  @ApiQuery({
    name: 'perPage',
    required: true,
    description: '한 번에 가져오는 갯수',
  })
  @ApiQuery({
    name: 'Page',
    required: true,
    description: '불러올 페이지',
  })
  @Get(':id/chats')
  getChat(@Query() query) {
    console.log(query.perPage, query.page);
  }

  @Post(':id/chats')
  postChat(@Body() body) {}
}
