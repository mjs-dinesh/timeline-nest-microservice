import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type UserActivityDocument = UserActivity & Document;

export enum TYPE {
  SECURITY = 'SECURITY',
  LOGIN = 'LOGIN',
}

export enum STATUS {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

@Schema({
  collection: 'user_activities',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  autoIndex: true,
})
export class UserActivity {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  })
  user_id: string;

  @Prop({
    type: String,
  })
  ip;

  @Prop({ type: String })
  device: string;

  @Prop({ type: String })
  os: string;

  @Prop({ type: String })
  ua: string;

  @Prop({ type: String })
  environment: string;

  @Prop({
    type: String,
  })
  activity: string;

  @Prop({
    type: String,
  })
  message: string;

  @Prop({
    type: String,
    enum: [STATUS.FAILED, STATUS.SUCCESS],
  })
  status: string;

  @Prop({
    type: String,
    enum: [TYPE.LOGIN, TYPE.SECURITY],
  })
  type: string;

  @Prop({
    type: Date,
  })
  deleted_at: Date;
}

export const UserActivitySchema = SchemaFactory.createForClass(UserActivity);
