import { IsOptional, IsString } from 'class-validator';
import { QueryDto } from 'src/utils/constant';
import { Expose, Transform } from 'class-transformer';

export class QueryTimeLineDto extends QueryDto {
  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @Expose({ name: 'sorter' })
  @Transform((v) => {
    if (v?.obj?.sorter) {
      return Object.keys(v.obj?.sorter)?.length !== 0
        ? v.obj?.sorter
        : { date: -1 };
    } else {
      return { date: -1 };
    }
  })
  sorter;

  @IsOptional()
  limit;

  @IsOptional()
  page;

  @IsOptional()
  @Expose({ name: 'date' })
  @Transform((v) => {
    console.log(v?.obj?.date);
    if (v?.obj?.date) {
      return Object.keys(v.obj?.date)?.length !== 0
        ? typeof v.obj?.date === 'string'
          ? JSON.parse(v.obj?.date)
          : v.obj?.date
        : { date: -1 };
    }
  })
  date;
}
