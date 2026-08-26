# Variables defitnition that are 
# passed from main.tf during module consumption

variable "repository_name" {
  type = string
}

variable "account_id" {
  type = string
}

variable "region" {
  type = string
}

variable "ecr_registry_port" {
  type    = string
}

variable "image_tag" { 
  type    = string
}
