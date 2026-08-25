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

# HTTP API GATEWAY
resource "aws_apigatewayv2_api" "http" {
  name          = "${var.lambda_function_name}-api-gateway"
  protocol_type = "HTTP"
}

# INTEGRATION (API → LAMBDA)
resource "aws_apigatewayv2_integration" "lambda" {
  api_id                 = aws_apigatewayv2_api.http.id
  integration_type       = "AWS_PROXY"
  integration_uri        = module.lambda.invoke_arn 
  payload_format_version = "1.0"
}

# ROUTE ( POST /greetings )
resource "aws_apigatewayv2_route" "catchall" {
  api_id    = aws_apigatewayv2_api.http.id
  route_key = "ANY /{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

# STAGE
resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.http.id
  name        = "$default"
  auto_deploy = true
}

# LAMBDA PERMISSION (API → LAMBDA)
resource "aws_lambda_permission" "allow_apigw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = module.lambda.invoke_arn 
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.http.execution_arn}/*"
}


