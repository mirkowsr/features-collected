/* ecr variables config*/
variable "repository_name" {
  description = "ECR repository name for the lambda image"
  type        = string
  default     = "aws-lambda-backend"
}

variable "image_tag" {
  description = "Image tag reference for ECR and lambda image_uri"
  type        = string
}

variable "ecr_registry_port" {
  description = "Port suffix on the ECR registry host. ':4566' for ministack; '' for real AWS."
  type        = string
  default     = ":4566"
}

/* lambda variables config, with DB connection details*/
variable "lambda_function_name" {
  description = "Name of the REST API lambda function (invoked via API Gateway)"
  type        = string
  default     = "lambda-fn"
}

variable "lambda_sqs_function_name" {
  description = "Name of the SQS worker lambda (triggered by the event source mapping)"
  type        = string
  default     = "lambda-sqs-fn"
}

variable "db_host" {
  description = "PostgreSQL host. 'postgres' for ministack (container-network DNS); RDS endpoint for real AWS."
  type        = string
  default     = "postgres"
}

variable "db_port" {
  description = "PostgreSQL port"
  type        = string
  default     = "5432"
}

variable "db_user" {
  description = "PostgreSQL user"
  type        = string
  default     = "postgres"
}

variable "db_password" {
  description = "PostgreSQL password"
  type        = string
  default     = "postgres"
}

variable "db_name" {
  description = "PostgreSQL database name"
  type        = string
  default     = "features"
}

## trigger command for docker image for lambda rest-api
variable "lambda_rest_api_container_command" {
  description = "Container command for the REST lambda (e.g. dist/lambda.handler)"
  type        = string
  default     = "dist/lambda.handler"
}

## trigger command for docker image for lambda sqs 
variable "lambda_sqs_container_command" {
  description = "Container command for the SQS worker lambda (e.g. dist/sqs.handler)"
  type        = string
  default     = "dist/sqs.handler"
}

variable "aws_account_id" {
  description = "Ministack account ID embedded in queue URLs"
  type        = string
  default     = "000000000000"
}

variable "aws_endpoint_host" {
  description = "Ministack endpoint as seen from where terraform runs (host)"
  type        = string
  default     = "http://localhost:4566"
}

variable "aws_endpoint_network" {
  description = "Ministack endpoint as seen from inside lambda containers (compose network)"
  type        = string
  default     = "http://ministack:4566"
}

variable "queue_name" {
  description = "SQS queue name"
  type        = string
  default     = "terraform_queue"
}

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "aws_access_key_id" {
  description = "AWS access key ID (test for Ministack)"
  type        = string
  default     = "test"
}

variable "aws_secret_access_key" {
  description = "AWS secret access key (test for Ministack)"
  type        = string
  default     = "test"
}

variable "dlq_name" {
  description = "SQS dead-letter queue name"
  type        = string
  default     = "terraform_dlq"
}

variable "emulator" {
  description = "true for Ministack/LocalStack (path-style + skip validation); false for real AWS"
  type        = bool
  default     = true
}

