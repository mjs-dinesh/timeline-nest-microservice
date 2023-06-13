import { PartialType } from '@nestjs/mapped-types';
import { CreateUserActivityDto } from './create_user_activity.dto';

export class UpdateUserActivityDto extends PartialType(CreateUserActivityDto) {}
