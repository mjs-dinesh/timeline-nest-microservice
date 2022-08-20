import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSecurityModule } from '../user_security/user_security.module';
import { Usercontroller } from './user.controller';
import { UserSchema } from './user.schema';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'users', schema: UserSchema }]),
    UserSecurityModule,
  ],
  controllers: [Usercontroller],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
