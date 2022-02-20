import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from 'src/middlewares/logger.middleware';
import { UsersModule } from './users/users.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { DmsService } from './dms/dms.service';
import { DmsController } from './dms/dms.controller';
import { ChannelsController } from './channels/channels.controller';
import { ChannelsService } from './channels/channels.service';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: ['entities/*.js'],
          autoLoadEntities: true, //TypeOrmModule.forFeature에 든 엔티티만 자동으로 연결
          synchronize: true,
          // 처음 생성할 때 sync 맞추기 위해 사용하고, 이후에는 안정성을 위해 false로 두는 것을 권장
          logging: true, // ORM이 어떤 sql로 쿼리를 날렸는지 알 수 있음
          keepConnectionAlive: true, // hot reloading을 위해 계속 connection 유지
        };
      },
    }),
    UsersModule,
    WorkspacesModule,
  ],
  controllers: [AppController, DmsController, ChannelsController],
  providers: [AppService, DmsService, ChannelsService, UsersService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*'); //routes 전체에 로거 기능을 지원하겠다는 뜻
  }
}
