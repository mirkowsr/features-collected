import { Inject } from '@nestjs/common'

import { S3_CLIENT } from './aws-s3.constants'

export const InjectS3 = () => Inject(S3_CLIENT)
