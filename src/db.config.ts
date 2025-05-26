import { DataSource } from 'typeorm';

export const appDataSource = new DataSource({
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
