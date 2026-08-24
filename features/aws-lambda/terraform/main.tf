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

resource "aws_ecr_repository" "aws-lambda-backend" {
  name = var.repository_name

  image_scanning_configuration {
    scan_on_push = true
  }

  image_tag_mutability = "MUTABLE"

  encryption_configuration {
    encryption_type = "AES256"
  }
}

# IAM role for Lambda execution
data "aws_iam_policy_document" "assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "aws_lambda_role" {
  name               = "lambda_execution_role"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

resource "aws_lambda_function" "api" {
  function_name = var.lambda_function_name
  role          = aws_iam_role.aws_lambda_role.arn
  package_type  = "Image"
  image_uri     = format("%s.dkr.ecr.%s.amazonaws.com%s/%s:%s", 
    data.aws_caller_identity.current.account_id, 
    data.aws_region.current.name, 
    var.ecr_registry_port, 
    var.repository_name, 
    var.image_tag)

  memory_size = 512
  timeout     = 30
  
  image_config { 
    command = ["dist/lambda.handler"] 
  }

  architectures = ["arm64"] # Graviton support for better price/performance
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
  integration_uri        = aws_lambda_function.api.invoke_arn
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
  function_name = aws_lambda_function.api.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.http.execution_arn}/*"
}


