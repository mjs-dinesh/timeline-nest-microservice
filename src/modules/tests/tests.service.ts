
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { plainToInstance } from 'class-transformer'
import { Paginator } from 'src/utils'
import { TestDto } from './dto/test.dto'
import { FilterListTestDto } from './dto/filter_list_test.dto'
import { FilterTestDto } from './dto/filter_test.dto'
import { Model } from 'mongoose'

@Injectable()
export class TestsService {
  constructor(
    @InjectModel('Test') private readonly TestModel: Model<unknown>
  ) {}

  public async isExist(data) {
    const filter = plainToInstance(FilterTestDto, data, {
      exposeUnsetFields: false,
    })
    return await this.TestModel.findOne(filter)
  }  

  public async create(body) {
    const result = await new this.TestModel(body).save()
    return plainToInstance(TestDto, result.toObject())
  }

  public async view(query) {
    const result = await this.TestModel.findOne(query).lean()
    return plainToInstance(TestDto, result)
  }

  public async list(query) {
    query.filter = plainToInstance(FilterListTestDto, query, {
      exposeUnsetFields: false,
    })
    return await new Paginator(this.TestModel).find(query)
  }

  public async update(id, body) {
    const result = await this.TestModel
      .findByIdAndUpdate(id, body, {
        new: true,
      })
      .lean()
    return plainToInstance(TestDto, result)
  }

  public async delete(id) {
    await this.TestModel
      .findByIdAndUpdate(
        id,
        { $set: { delete_at: Date.now() } },
        {
          new: true,
        }
      )
      .lean()
  }
}
