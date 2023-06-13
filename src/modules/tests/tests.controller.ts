
import {
  Controller,
  HttpStatus,
} from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'
import { TestsService } from './tests.service'
import { CreateTestDto } from './dto/create_test.dto'
import { DetailTestDto } from './dto/detail_test.dto'
import { UpdateTestDataDto } from './dto/update_test_data.dto'
import { DeleteTestDto } from './dto/delete_test.dto'
import { QueryTestDto } from './dto/query_test.dto'
import { ListTestDto } from './dto/list_test.dto'
import { plainToInstance } from 'class-transformer'

@Controller()
export class TestsController {
  constructor(private readonly TestsService: TestsService) {}

  @MessagePattern('tests_create')
  public async create(body: CreateTestDto) {
    return await this.TestsService.create(body)
  }

  @MessagePattern('tests_list')
  public async list(query: QueryTestDto) {
    const result = await this.TestsService.list(query)
    return plainToInstance(ListTestDto, result)
  }

  @MessagePattern('tests_exist')
  public async isExist(query) {
    return await this.TestsService.isExist(query)
  }

  @MessagePattern('tests_view')
  public async view(data: DetailTestDto) {
    return await this.TestsService.view(data)
  }

  @MessagePattern('tests_update')
  public async update(data: UpdateTestDataDto) {
    return await this.TestsService.update(data._id, data.body)
  }

  @MessagePattern('tests_delete')
  public async delete(data: DeleteTestDto) {
    await this.TestsService.delete(data._id)
    return {
      statusCode: HttpStatus.NO_CONTENT,
    }
  }
}
