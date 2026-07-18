import { Inject } from '@nestjs/common'
import { S3_CLIENT } from './aws-s3.module'

export { S3_CLIENT } from './aws-s3.module'

export const InjectS3 = () => Inject(S3_CLIENT)
