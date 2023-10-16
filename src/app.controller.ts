import { Controller, Get } from '@nestjs/common';
import { Public } from 'auth/auth.decorator';

@Controller()
export class AppController {
  constructor() {}

  @Public()
  @Get()
  getHello(): string {
    return 'Hello World...!';
  }
}
