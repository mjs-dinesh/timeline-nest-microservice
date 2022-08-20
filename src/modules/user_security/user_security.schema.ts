import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type UserDocument = UserSecurity & Document;

@Schema({
  collection: 'user_securities',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  autoIndex: true,
})
export class UserSecurity {
  @Prop({
    name: 'password',
    type: String,
  })
  password: string;

  @Prop({
    name: 'user_id',
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    unique: true,
  })
  user_id: string;

  @Prop({
    name: 'is_email_verified',
    type: Boolean,
    default: false,
  })
  is_email_verified: boolean;

  @Prop({
    name: 'is_phone_verified',
    type: Boolean,
    default: false,
  })
  is_phone_verified: boolean;

  @Prop({
    name: 'email_verification_token',
    type: String,
  })
  email_verification_token: string;

  @Prop({
    name: 'phone_verification_token',
    type: String,
  })
  phone_verification_token: string;

  @Prop({
    name: 'gauth_verification_token',
    type: String,
  })
  gauth_verification_token: string;

  @Prop({
    name: 'is_gauth_enabled',
    type: Boolean,
    default: false,
  })
  is_gauth_enabled: boolean;

  @Prop({
    name: 'is_logged_in',
    type: Boolean,
    default: false,
  })
  is_logged_in: boolean;
}

export const UserSecuritySchema = SchemaFactory.createForClass(UserSecurity);

UserSecuritySchema.index({ user_id: 1 });
