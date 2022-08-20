import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailService } from '../mail/mail.service';
import { SMSService } from '../sms/sms.service';
import { UserSchema } from '../user/user.schema';
import { UserSecurityModule } from '../user_security/user_security.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'users', schema: UserSchema }]),
    UserSecurityModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
