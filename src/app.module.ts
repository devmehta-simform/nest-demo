import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { DbModule } from './db/db.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfigObj } from './db.config';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TodosModule,
    DbModule,
    TypeOrmModule.forRoot(dbConfigObj),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
