# outputs passed to main.tf as variables
output "queue_arn" {
  value = aws_sqs_queue.this.arn 
}

output "queue_url" {
  value = aws_sqs_queue.this.url
}


