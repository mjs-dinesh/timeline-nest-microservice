
import { IsOptional, IsString } from 'class-validator'
import { QueryDto } from 'src/utils'
import { Expose, Transform } from 'class-transformer'

export class QueryTestDto extends QueryDto {
  @IsOptional()
  @IsString()
  search: string

  @IsOptional()
  @Expose({ name: 'sorter' })
  @Transform((v) => (v.value = { created_at: -1 }))
  sorter
}
