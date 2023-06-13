import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  collection: 'users',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  autoIndex: true,
})
export class User {
  @Prop({
    name: 'email',
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  })
  email: string;

  @Prop({
    name: 'first_name',
    type: String,
  })
  first_name: string;

  @Prop({
    name: 'last_name',
    type: String,
    default: '',
  })
  last_name: string;

  @Prop({
    name: 'profile_picture',
    type: String,
  })
  profile_picture: string;

  @Prop({
    name: 'phone',
    type: String,
  })
  phone: string;

  @Prop({
    name: 'phone_code',
    type: String,
  })
  phone_code: string;

  @Prop({
    name: 'country',
    default: 'India',
    type: String,
  })
  country: string;

  @Prop({
    name: 'currency',
    default: 'INR',
    type: String,
  })
  currency: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
