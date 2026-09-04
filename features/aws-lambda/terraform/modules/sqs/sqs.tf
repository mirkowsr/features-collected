resource "aws_sqs_queue" "dlq" {
  name                      = var.dlq_name
  message_retention_seconds = 1209600
}

resource "aws_sqs_queue" "this" {
  name                      = var.queue_name
  delay_seconds             = 0 
  max_message_size          = 2048
  message_retention_seconds = 86400
  receive_wait_time_seconds = 10
  visibility_timeout_seconds = 180

  redrive_policy = jsonencode({
     deadLetterTargetArn = aws_sqs_queue.dlq.arn
     maxReceiveCount = 3 
  })
}
