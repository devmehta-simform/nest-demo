import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const dbProvider = {
  provide: 'DATA_SOURCE',
  useFactory: async () => {
    const appDataSource = new DataSource({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'todosdb',
      logging: true,
      entities: ['build/**/*.entity.js'],
      migrations: ['build/migration/*.js'],
      subscribers: [],
    });
    return await appDataSource.initialize();
  },
};
