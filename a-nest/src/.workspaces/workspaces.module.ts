import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelMembers } from '../entities/ChannelMembers';
import { Channels } from '../entities/Channels';
import { Users } from '../entities/Users';
import { WorkspaceMembers } from '../entities/WorkspaceMembers';
import { Workspaces } from '../entities/Workspaces';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Users,
      Workspaces,
      Channels,
      WorkspaceMembers,
      ChannelMembers,
    ]),
  ],
})
export class WorkspacesModule {}
