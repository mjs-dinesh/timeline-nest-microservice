import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  CONFIG_VALIDATION_OPTION,
  CONFIG_VALIDATION_SCHEMA,
} from './common_utils/constant';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { UserSecurityModule } from './modules/user_security/user_security.module';
// _MI_

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: CONFIG_VALIDATION_SCHEMA,
      validationOptions: CONFIG_VALIDATION_OPTION,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ({
          uri: configService.get('DB_URL'),
          useNewUrlParser: true,
          useUnifiedTopology: true,
        } as MongooseModuleAsyncOptions),
    }),
    AuthModule,
    UserModule,
    UserSecurityModule,
    // _M_
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
