import 'reflect-metadata';
import { appDataSource } from '../db.config';
import { DATA_SOURCE } from '../constants/providers';

export const dbProvider = {
  provide: DATA_SOURCE,
  useFactory: async () => {
    return await appDataSource.initialize();
  },
};
