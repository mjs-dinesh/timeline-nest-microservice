
import { Exclude, Expose, Transform } from 'class-transformer'

export class FilterListTestDto {
  @Exclude()
  page

  @Exclude()
  limit

  @Expose()
  @Transform(() => {
    return { $exists: false }
  })
  deleted_at

  //   @Expose({ name: "search" })
  //   @Transform(v => {
  //     if (v.value) {
  //       return [{ name: { $regex: v.value, $options: "i" } }];
  //     }
  //     return undefined;
  //   })
  //   $or;
}
