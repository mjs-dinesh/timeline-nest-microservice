import { IsNotEmpty } from 'class-validator';

export class DisableGauthDto {
  @IsNotEmpty()
  user_id: string;
}
