import { IsNotEmpty } from 'class-validator';
import { DeviceInfoDto } from 'src/modules/auth/dto/device_info.dto';

export class CreateUserActivityDto extends DeviceInfoDto {
  @IsNotEmpty()
  user_id;

  @IsNotEmpty()
  activity;

  @IsNotEmpty()
  type;

  @IsNotEmpty()
  message;

  @IsNotEmpty()
  status;
}
