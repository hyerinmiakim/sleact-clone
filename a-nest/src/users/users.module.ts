import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../entities/Users';
import { ChannelMembers } from '../entities/ChannelMembers';
import { WorkspaceMembers } from '../entities/WorkspaceMembers';
import { Workspaces } from '../entities/Workspaces';
import { Channels } from '../entities/Channels';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Users,
      Workspaces,
      Channels,
      ChannelMembers,
      WorkspaceMembers,
    ]),
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
