variable "lambda_invoke_arn" {
  description = "ARN of the backend lambda to proxy requests to"
  type        = string
}

variable "lambda_function_name" {
  description = "Backend lambda function name (naming + invoke permission)"
  type        = string
}
