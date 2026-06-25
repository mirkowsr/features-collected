import { Injectable } from '@nestjs/common'
import { and, eq, gt } from 'drizzle-orm'
import { InjectDrizzle } from '../db/drizzle.decorator'
import { images, time_limits } from '../db/schema'
import { DrizzleSchema } from '../db/types/drizzle.type'
import { ImageDto } from './validation/images.schema'

@Injectable()
export class ImagesService {
  constructor(@InjectDrizzle() private db: DrizzleSchema) {}

  findAll() {
    return this.db
      .select({
        id: images.id,
        title: images.title,
        url: images.url,
        mime_type: images.mime_type,
        file_size: images.file_size,
        width: images.width,
        height: images.height,
        valid_till: time_limits.valid_till,
      })
      .from(images)
      .innerJoin(time_limits, eq(time_limits.resource_id, images.id))
      .where(
        and(
          gt(time_limits.valid_till, new Date()),
          eq(time_limits.resource_type, 'image'),
        ),
      )
  }

  async findOne(id: string) {
    return await this.db
      .select({
        id: images.id,
        title: images.title,
        url: images.url,
        mime_type: images.mime_type,
        file_size: images.file_size,
        width: images.width,
        height: images.height,
        valid_till: time_limits.valid_till,
      })
      .from(images)
      .innerJoin(time_limits, and(eq(time_limits.resource_id, images.id)))
      .where(
        and(
          gt(time_limits.valid_till, new Date()),
          eq(time_limits.resource_id, id),
          eq(time_limits.resource_type, 'image'),
        ),
      )
  }

  async create(image: ImageDto) {
    const [result] = await this.db
      .insert(images)
      .values({
        ...image,
      })
      .returning()

    return result
  }
}
