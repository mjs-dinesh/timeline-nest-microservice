import { Expose, Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { DeviceInfoValidation } from './device_info.dto';

export class SignupDto extends DeviceInfoValidation {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  @Expose()
  @Transform(({ obj }) => {
    return obj?.email.split('@')[0] || '';
  })
  first_name: string;
}
