variable "repository_name" {
  default = "aws-lambda-backend"
}

variable "account_id" {
  type = string
}

variable "region" {
  type = string
}

variable "ecr_registry_port" {
  type    = string
  default = ":4566"
}

variable "image_tag" { 
  type    = string
  default = "latest"
}
