import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('ping')
  async ping() {
    return this.appService.ping();
  }

  @MessagePattern('time')
  async time() {
    return this.appService.time();
  }
}
