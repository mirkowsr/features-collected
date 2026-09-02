import { Inject } from '@nestjs/common'
import { SQS_CLIENT } from './aws-sqs.module'

export { SQS_CLIENT } from './aws-sqs.module'

export const InjectSQS = () => Inject(SQS_CLIENT)
