import { IsEmail, IsNotEmpty } from 'class-validator';
import { DeviceInfoValidation } from './device_info.dto';

export class ForgotPasswordDto extends DeviceInfoValidation {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
