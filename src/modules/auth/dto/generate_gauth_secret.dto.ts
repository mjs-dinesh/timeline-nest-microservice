import { IsNotEmpty } from 'class-validator';

export class GenerateGauthSecretDto {
  @IsNotEmpty()
  user_id: string;
}
