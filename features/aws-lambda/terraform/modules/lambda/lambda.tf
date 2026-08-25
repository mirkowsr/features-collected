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
  image_uri     = var.image_uri 

  role          = aws_iam_role.aws_lambda_role.arn
  package_type  = "Image"

  memory_size = 512
  timeout     = 30
  image_config { 
    command = ["dist/lambda.handler"] 
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
