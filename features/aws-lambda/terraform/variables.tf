/* ecr variables config*/
variable "repository_name" {
  default = "aws-lambda-backend"
}

variable "image_tag" {
  default = "latest"
}

variable "ecr_registry_port" {
  description = "Port suffix on the ECR registry host. ':4566' for ministack; '' for real AWS."
  type        = string
  default     = ":4566"
}

/* lambda variables config, with DB connection details*/
variable "lambda_function_name" {
  default = "lambda-fn"
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

/* api gateway variables */

variable "lambda_invoke_arn" {
  type = string
}

variable "api_gw_lambda_function_name" {
  type = string
}
