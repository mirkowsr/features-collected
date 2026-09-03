variable "db_host" {
  description = "PostgreSQL host. 'postgres' for ministack (container-network DNS); RDS endpoint for real AWS."
  type        = string
}

variable "db_port" {
  description = "PostgreSQL port"
  type        = string
}

variable "db_user" {
  description = "PostgreSQL user"
  type        = string
}

variable "db_password" {
  description = "PostgreSQL password"
  type        = string
}

variable "db_name" {
  description = "PostgreSQL database name"
  type        = string
}

variable "lambda_function_name" {
  description = "Lambda function name"
  type        = string
}

variable "image_uri" {
  description = "URI of the lambda container image"
  type        = string
}

variable "container_command" {
  description = "Command the lambda runtime executes (e.g. dist/lambda.handler)"
  type        = string
}

variable "sqs_endpoint" {
  description = "SQS endpoint (LocalStack/ministack container-network DNS)"
  type        = string
}

variable "sqs_queue_url" {
  description = "SQS queue URL (ministack container-network DNS)"
  type        = string
}

variable "aws_region" {
  description = "AWS region"
  type        = string
}

variable "aws_access_key_id" {
  description = "AWS access key ID"
  type        = string
}

variable "aws_secret_access_key" {
  description = "AWS secret access key"
  type        = string
}
