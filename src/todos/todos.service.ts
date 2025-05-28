import { Inject, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { UserToken } from '../types/user-token';
import { TODO_REPOSITORY } from '../constants/providers';

@Injectable()
export class TodosService {
  constructor(
    @Inject(TODO_REPOSITORY) private todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto, user: UserToken) {
    const insertResult = await this.todoRepository.insert({
      ...createTodoDto,
      user: { id: user.id },
    });
    return insertResult.generatedMaps[0];
  }

  async findAll(user: UserToken) {
    return await this.todoRepository.find({
      where: { user: { id: user.id } },
    });
  }

  async findOne(id: number, user: UserToken) {
    return await this.todoRepository.findOne({
      where: { id, user: { id: user.id } },
    });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto, user: UserToken) {
    await this.todoRepository.update(
      { id, user: { id: user.id } },
      updateTodoDto,
    );
  }

  async remove(id: number, user: UserToken) {
    await this.todoRepository.delete({ id, user: { id: user.id } });
  }
}
