import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Paginator } from 'src/utils/paginate';
import { UserActivityDto } from './dto/user_activity.dto';
import { FilterListUserActivityDto } from './dto/filter_list_user_activity.dto';
import { FilterUserActivityDto } from './dto/filter_user_activity.dto';
import { Model } from 'mongoose';

@Injectable()
export class UserActivitiesService {
  constructor(
    @InjectModel('UserActivity')
    private readonly UseractivityModel: Model<unknown>,
  ) {}

  public async isExist(data) {
    const filter = plainToInstance(FilterUserActivityDto, data, {
      exposeUnsetFields: false,
    });
    return await this.UseractivityModel.findOne(filter);
  }

  public async create(body) {
    const result = await new this.UseractivityModel(body).save();
    return plainToInstance(UserActivityDto, result.toObject());
  }

  public async view(query) {
    const result = await this.UseractivityModel.findOne(query).lean();
    return plainToInstance(UserActivityDto, result);
  }

  public async list(query) {
    query.filter = plainToInstance(FilterListUserActivityDto, query, {
      exposeUnsetFields: false,
    });
    return await new Paginator(this.UseractivityModel).find(query);
  }

  public async update(id, body) {
    const result = await this.UseractivityModel.findByIdAndUpdate(id, body, {
      new: true,
    }).lean();
    return plainToInstance(UserActivityDto, result);
  }

  public async delete(id) {
    await this.UseractivityModel.findByIdAndUpdate(
      id,
      { $set: { deleted_at: Date.now() } },
      {
        new: true,
      },
    ).lean();
  }
}
