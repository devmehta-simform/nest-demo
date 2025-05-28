import { DataSource } from 'typeorm';
import { Todo } from '../entities/todo.entity';
import { DATA_SOURCE, TODO_REPOSITORY } from '../../constants/providers';

export const todoProvider = {
  provide: TODO_REPOSITORY,
  useFactory: (dataSource: DataSource) => dataSource.getRepository(Todo),
  inject: [DATA_SOURCE],
};
