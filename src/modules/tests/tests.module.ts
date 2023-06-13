
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Test, TestSchema } from './test.schema'
import { TestsController } from './tests.controller'
import { TestsService } from './tests.service'
import { TestValidationRule } from './rules/test_validation.rule'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Test.name, schema: TestSchema }]),
  ],
  controllers: [TestsController],
  providers: [TestsService, TestValidationRule],
})
export class TestsModule {}
