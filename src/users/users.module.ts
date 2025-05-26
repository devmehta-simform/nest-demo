import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { userRepositoryProvider } from './providers/users.provider';
import { dbProvider } from '../db/db.provider';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [UsersController],
  providers: [UsersService, userRepositoryProvider, dbProvider],
  exports: [userRepositoryProvider, DbModule],
})
export class UsersModule {}
