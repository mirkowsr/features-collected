
# Data source for IAM Lambda policy
# It allows AWS Lambda to assume this role
# It renders JSON with policy rules
# https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_version.html
# it answers question 'what' lambda can do
data "aws_iam_policy_document" "assume_role" {
  statement {
    effect = "Allow"
    actions = ["sts:AssumeRole"]
    
    # Who is performing an action
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

  }
}

# This is role creation 
# Permissions container that consumes policy 
# json data source (aws_iam_policy_document)
resource "aws_iam_role" "aws_lambda_role" {
  name               = "${var.lambda_function_name}_lambda_execution_role"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

# Lambda definition 
# + role consumption
resource "aws_lambda_function" "api" {
  function_name = var.lambda_function_name
  image_uri     = var.image_uri 
  
  # Lambda role permissions attachment
  role          = aws_iam_role.aws_lambda_role.arn
  package_type  = "Image"

  memory_size = 512
  timeout     = 30
  image_config { 
    command = [var.container_command] 
  }

  environment {
    variables = {
      DB_HOST     = var.db_host
      DB_PORT     = var.db_port
      DB_USER     = var.db_user
      DB_PASSWORD = var.db_password
      DB_NAME     = var.db_name
    }
  }

  architectures = ["arm64"]
}
