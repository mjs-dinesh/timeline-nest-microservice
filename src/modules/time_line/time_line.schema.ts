import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TimeLineDocument = TimeLine & Document;

@Schema({
  collection: 'time_line',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  autoIndex: true,
})
export class TimeLine {
  @Prop({
    type: String,
    required: true,
  })
  title: string;

  @Prop({
    type: String,
  })
  description: string;

  @Prop({
    type: Date,
    default: Date.now,
  })
  date: string;

  @Prop({
    type: String,
    required: true,
    ref: 'users',
  })
  user_id;

  @Prop({
    type: String,
  })
  note: string;

  @Prop({
    type: Date,
  })
  deleted_at: Date;
}

export const TimeLineSchema = SchemaFactory.createForClass(TimeLine);
