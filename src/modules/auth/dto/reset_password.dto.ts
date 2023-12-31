import { IsNotEmpty } from 'class-validator';
import { DeviceInfoValidation } from './device_info.dto';

export class ResetPasswordDto extends DeviceInfoValidation {
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  user_id: string;
}
