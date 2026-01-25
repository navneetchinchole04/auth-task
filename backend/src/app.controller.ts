import { Controller, Get } from '@nestjs/common';
import { db } from './db';

@Controller()
export class AppController {
  @Get('test-db')
  async testDb() {
    const result = await db.query('SELECT NOW()');
    return result.rows;
  }
}
