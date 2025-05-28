import { DataSource, DataSourceOptions } from 'typeorm';

export const dbConfigObj: DataSourceOptions = {
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
} as const;

export const appDataSource = new DataSource(dbConfigObj);
