import { Inject } from '@nestjs/common'

import { SQS_CLIENT } from './aws-sqs.constants'

export const InjectSQS = () => Inject(SQS_CLIENT)
