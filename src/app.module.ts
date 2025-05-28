import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import { dbConfig } from './config/db.config';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TodosModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRoot(dbConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
