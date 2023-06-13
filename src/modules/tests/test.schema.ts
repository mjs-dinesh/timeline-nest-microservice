import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TestDocument = Test & Document;

@Schema({
  collection: 'tests',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  autoIndex: true,
})
export class Test {
  @Prop({
    type: String,
  })
  test: string;

  @Prop({
    type: Date,
  })
  deleted_at: Date;
}

export const TestSchema = SchemaFactory.createForClass(Test);
