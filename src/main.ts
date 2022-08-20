import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { ValidationPipeOptions } from './utils/helper/validation_pipe.helper';
import {
  MongoExceptionFilter,
  NotFoundExceptionFilter,
  ValidationFilter,
} from './utils/filters';
import { UnauthorizedExceptionFilter } from './utils/filters/unauthorized_exception';

async function bootstrap() {
  const configService: ConfigService = new ConfigService();
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: configService.get('HOST'),
        port: configService.get('PORT'),
      },
    },
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(new ValidationPipe(ValidationPipeOptions));
  app.useGlobalFilters(
    new MongoExceptionFilter(),
    new ValidationFilter(),
    new NotFoundExceptionFilter(),
    new UnauthorizedExceptionFilter(),
  );
  await app.listen();
}
bootstrap();
