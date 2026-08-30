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
  type = string
}

variable "image_uri" {
  type = string
}

variable "container_command" {
  type = string
}
