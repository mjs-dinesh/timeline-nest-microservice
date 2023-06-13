import { IsEmail, IsNotEmpty } from 'class-validator';
import { DeviceInfoValidation } from './device_info.dto';

export class LoginDto extends DeviceInfoValidation {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
