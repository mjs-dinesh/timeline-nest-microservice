import { Exclude, Expose, Transform } from 'class-transformer';

export class TimeLineDto {
  @Expose({ name: '_id' })
  @Transform((value) => value.obj._id.toString())
  _id: string;

  @Exclude()
  __v: number;
}
