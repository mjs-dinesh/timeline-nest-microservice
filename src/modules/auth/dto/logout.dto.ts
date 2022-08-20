import { IsNotEmpty } from 'class-validator';

export class LogoutDto {
  @IsNotEmpty()
  user_id: string;
}
