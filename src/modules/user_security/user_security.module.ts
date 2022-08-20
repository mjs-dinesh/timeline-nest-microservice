import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { MailService } from '../mail/mail.service';
import { SMSService } from '../sms/sms.service';
import { UserSecuritySchema } from './user_security.schema';
import { UserSecurityService } from './user_security.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'user_securities', schema: UserSecuritySchema },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('SECRETKEY'),
        signOptions: {
          expiresIn: configService.get('JWT_SHORT'),
        },
      }),
    }),
    EventEmitterModule.forRoot(),
  ],
  providers: [UserSecurityService, MailService, SMSService, ConfigService],
  exports: [UserSecurityService],
})
export class UserSecurityModule {}
