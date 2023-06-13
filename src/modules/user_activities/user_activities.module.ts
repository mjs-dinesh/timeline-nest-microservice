import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserActivity, UserActivitySchema } from './user_activity.schema';
import { UserActivitiesController } from './user_activities.controller';
import { UserActivitiesService } from './user_activities.service';
import { UserActivityValidationRule } from './rules/user_activity_validation.rule';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserActivity.name, schema: UserActivitySchema },
    ]),
  ],
  controllers: [UserActivitiesController],
  providers: [UserActivitiesService, UserActivityValidationRule],
  exports: [UserActivitiesService],
})
export class UserActivitiesModule {}
