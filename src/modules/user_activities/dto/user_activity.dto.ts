import { Exclude } from 'class-transformer';

export class UserActivityDto {
  @Exclude()
  __v: number;
}
