import { IsNotEmpty } from 'class-validator';
import { DeviceInfoValidation } from './device_info.dto';

export class ChangePassword extends DeviceInfoValidation {
  @IsNotEmpty()
  user_id;

  @IsNotEmpty()
  password;

  @IsNotEmpty()
  old_password;
}
