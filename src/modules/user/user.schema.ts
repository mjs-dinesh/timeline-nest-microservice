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
    name: 'name',
    type: String,
  })
  name: string;

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
}

export const UserSchema = SchemaFactory.createForClass(User);
