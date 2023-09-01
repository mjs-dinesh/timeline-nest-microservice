import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Paginator } from 'src/utils';
import { TimeLineDto } from './dto/time_line.dto';
import { FilterListTimeLineDto } from './dto/filter_list_time_line.dto';
import { FilterTimeLineDto } from './dto/filter_time_line.dto';
import { Model } from 'mongoose';

@Injectable()
export class TimeLineService {
  constructor(
    @InjectModel('TimeLine') private readonly TimelineModel: Model<unknown>,
  ) {}

  public async isExist(data) {
    const filter = plainToInstance(FilterTimeLineDto, data, {
      exposeUnsetFields: false,
    });
    return await this.TimelineModel.findOne(filter);
  }

  public async create(body) {
    const result = await new this.TimelineModel(body).save();
    return plainToInstance(TimeLineDto, result.toObject());
  }

  public async view(query) {
    const result = await this.TimelineModel.findOne(query).lean();
    return plainToInstance(TimeLineDto, result);
  }

  public async list(query) {
    query.filter = plainToInstance(FilterListTimeLineDto, query, {
      exposeUnsetFields: false,
    });
    return await new Paginator(this.TimelineModel).find(query);
  }

  public async update(id, body) {
    const result = await this.TimelineModel.findByIdAndUpdate(id, body, {
      new: true,
    }).lean();
    return plainToInstance(TimeLineDto, result);
  }

  public async delete(id) {
    console.log({ id });
    return await this.TimelineModel.findByIdAndUpdate(
      id,
      { $set: { deleted_at: Date.now() } },
      {
        new: true,
      },
    ).lean();
  }
}
