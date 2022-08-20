import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateBodyDto } from './dto/user_create.dto';
import { UserService } from './user.service';

@Controller('user')
export class Usercontroller {
  constructor(private readonly userService: UserService) {}

  public async getUserWithId(query) {
    return await this.userService.getUserWithId(query.user_id);
  }

  public async getUser(query) {
    return await this.userService.getUser(query);
  }

  @MessagePattern('is_user_exist')
  public async isUserExist(body: any) {
    return await this.userService.getUserWithId(body.user_id);
  }
}
