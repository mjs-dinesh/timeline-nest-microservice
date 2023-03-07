import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  ping(): string {
    return 'Pong';
  }

  time(): string {
    return new Date().toString();
  }
}
