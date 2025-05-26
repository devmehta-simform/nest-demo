import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { DbModule } from '../db/db.module';
import { todoProvider } from './providers/todos.provider';

@Module({
  imports: [DbModule],
  controllers: [TodosController],
  providers: [TodosService, todoProvider],
})
export class TodosModule {}
