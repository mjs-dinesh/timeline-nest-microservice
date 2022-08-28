import { IsNotEmpty } from 'class-validator';

export class GetUserWithToken {
  @IsNotEmpty()
  user_id: string;
}
