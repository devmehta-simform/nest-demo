import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config({});

export const dbConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'mydb',
  logging: false,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migration/*.js'],
  subscribers: [],
} as const;

export const appDataSource = new DataSource(dbConfig);
