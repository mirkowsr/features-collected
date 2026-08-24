variable "repository_name" {
  default = "aws-lambda-backend"
}

variable "image_tag" {
  default = "latest"
}

variable "lambda_function_name" {
  default = "lambda-fn"
}

variable "ecr_registry_port" {
  description = "Port suffix on the ECR registry host. ':4566' for ministack; '' for real AWS."
  type        = string
  default     = ":4566"
}
