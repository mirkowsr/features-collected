variable "queue_name" {
  description = "SQS main (non-DLQ) queue name"
  type        = string
}

variable "dlq_name" {
  description = "SQS dead-letter queue name"
  type        = string
}