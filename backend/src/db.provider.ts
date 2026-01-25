import { db } from './db';

export const DbProvider = {
  provide: 'DB',
  useValue: db,
};
