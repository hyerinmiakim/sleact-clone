import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from 'src/middlewares/logger.middleware';
import { UsersModule } from './users/users.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { DmsService } from './dms/dms.service';
import { DmsController } from './dms/dms.controller';
import { ChannelsController } from './channels/channels.controller';
import { ChannelsService } from './channels/channels.service';
import { UsersService } from './users/users.service';
import { ChannelChats } from './entities/ChannelChats';
import { ChannelMembers } from './entities/ChannelMembers';
import { Channels } from './entities/Channels';
import { DMs } from './entities/DMs';
import { Mentions } from './entities/Mentions';
import { Users } from './entities/Users';
import { WorkspaceMembers } from './entities/WorkspaceMembers';
import { Workspaces } from './entities/Workspaces';
import { UsersController } from './users/users.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        ChannelChats,
        ChannelMembers,
        Channels,
        DMs,
        Mentions,
        Users,
        WorkspaceMembers,
        Workspaces,
      ],
      migrations: [__dirname + '/src/migrations/*.ts'],
      cli: { migrationsDir: 'src/migrations' },
      autoLoadEntities: true,
      synchronize: false,
      logging: true, // ORM이 어떤 sql로 쿼리를 날렸는지 알 수 있음
      keepConnectionAlive: true, // hot reloading을 위해 계속 connection 유지
    }),
    UsersModule,
    WorkspacesModule,
    TypeOrmModule.forFeature([Users]),
  ],
  controllers: [
    AppController,
    DmsController,
    ChannelsController,
    UsersController,
  ],
  providers: [AppService, UsersService, ChannelsService, DmsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*'); //routes 전체에 로거 기능을 지원하겠다는 뜻
  }
}
