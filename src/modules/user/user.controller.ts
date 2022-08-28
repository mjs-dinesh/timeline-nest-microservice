import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { GetUserWithToken } from './dto/get_user_with_token';
import { UserService } from './user.service';

@Controller('user')
export class Usercontroller {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('get_user_with_id')
  public async getUserWithId(query) {
    return await this.userService.getUserWithId(query.user_id);
  }

  @MessagePattern('get_user')
  public async getUser(query) {
    return await this.userService.getUser(query);
  }

  @MessagePattern('get_user_with_token')
  public async getUserWithToken(query: GetUserWithToken) {
    return await this.userService.getUserWithId(query.user_id);
  }

  @MessagePattern('is_user_exist')
  public async isUserExist(body: any) {
    return await this.userService.getUserWithId(body.user_id);
  }
}
