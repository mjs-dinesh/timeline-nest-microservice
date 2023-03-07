import { IsNotEmpty } from 'class-validator';

export class SendOTPDto {
  @IsNotEmpty()
  user_id: string;
}
