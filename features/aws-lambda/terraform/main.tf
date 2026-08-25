provider "aws" {
  region                      = "us-east-1"
  access_key                  = "test"
  secret_key                  = "test"
  s3_use_path_style           = true
  skip_credentials_validation = true
  skip_requesting_account_id  = true
  skip_metadata_api_check     = true

  endpoints {
    ecr          = "http://localhost:4566"
    apigatewayv2 = "http://localhost:4566"
    iam          = "http://localhost:4566"
    sts          = "http://localhost:4566"
    lambda       = "http://localhost:4566"
  }
}

data "aws_caller_identity" "current" {}

data "aws_region" "current" {}

module "ecr" {
  source             = "./modules/ecr"
  account_id         = data.aws_caller_identity.current.account_id
  region             = data.aws_region.current.name
  repository_name    = var.repository_name 
  ecr_registry_port  = var.ecr_registry_port
  image_tag          = var.image_tag
}

module "lambda" {
  source = "./modules/lambda"

  db_host = var.db_host
  db_port = var.db_port
  db_user = var.db_user
  db_password = var.db_password
  db_name = var.db_name
  lambda_function_name = var.lambda_function_name
  image_uri = module.ecr.image_uri
}

module "api_gateway" {
  source = "./modules/api_gateway"
  
  lambda_invoke_arn = module.lambda.invoke_arn
  lambda_function_name = module.lambda.function_name
  
}


