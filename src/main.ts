import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ValidationPipeOptions } from './common_utils/helpers/validation_pipe.helper';
import { MongoExceptionFilter, ValidationFilter } from './utils/filters';

async function bootstrap() {
  const configService: ConfigService = new ConfigService()
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: configService.get('HOST'),
        port: configService.get('PORT'),
      },
    }
  )
  app.useGlobalPipes(new ValidationPipe(ValidationPipeOptions))
  app.useGlobalFilters(new MongoExceptionFilter(), new ValidationFilter())
  await app.listen();
}
bootstrap();
