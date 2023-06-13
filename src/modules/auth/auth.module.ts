import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../user/user.schema';
import { UserSecurityModule } from '../user_security/user_security.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserActivitiesModule } from '../user_activities/user_activities.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'users', schema: UserSchema }]),
    UserSecurityModule,
    UserActivitiesModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
