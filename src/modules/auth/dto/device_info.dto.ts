import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmpty,
  IsObject,
  ValidateNested,
} from 'class-validator';

export class DeviceInfoDto {
  @IsNotEmpty()
  ip;

  @IsNotEmpty()
  device;

  @IsNotEmpty()
  os;

  @IsNotEmpty()
  ua;

  @IsNotEmpty()
  environment;
}

export class DeviceInfoValidation {
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => DeviceInfoDto)
  device_info;
}
