# Variables defitnition that are 
# passed from main.tf during module consumption

variable "repository_name" {
  type = string
}

variable "ecr_registry_port" {
  type    = string
  default = "" 
  description = "Emulator compensation: ministack advertises ECR URLs without the gateway port, and its Lambda executor pulls the literal string."
}

variable "image_tag" { 
  type    = string
}

