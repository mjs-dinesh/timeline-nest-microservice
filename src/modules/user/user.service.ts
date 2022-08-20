import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSecurityService } from '../user_security/user_security.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('users') private readonly userModel: Model<unknown>,
  ) {}

  public async getUserWithId(userId) {
    return await this.userModel.findById({ _id: userId }).lean();
  }

  public async getUser(query) {
    return await this.userModel.findOne(query).lean();
  }
}
