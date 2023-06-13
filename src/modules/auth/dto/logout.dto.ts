import { IsNotEmpty } from 'class-validator';
import { DeviceInfoValidation } from './device_info.dto';

export class LogoutDto extends DeviceInfoValidation {
  @IsNotEmpty()
  user_id: string;
}
