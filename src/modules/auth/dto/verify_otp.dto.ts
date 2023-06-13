import { IsNotEmpty } from 'class-validator';
import { DeviceInfoValidation } from './device_info.dto';

export class VerifyOTPDto extends DeviceInfoValidation {
  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  otp: string;
}
