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
    sqs          = "http://localhost:4566"
  }
}

module "ecr" {
  source            = "./modules/ecr"
  repository_name   = var.repository_name
  ecr_registry_port = var.ecr_registry_port
  image_tag         = var.image_tag
}

## REST API Lambda
module "lambda" {
  source = "./modules/lambda"

  db_host              = var.db_host
  db_port              = var.db_port
  db_user              = var.db_user
  db_password          = var.db_password
  db_name              = var.db_name
  lambda_function_name = var.lambda_function_name
  image_uri            = module.ecr.image_uri
  container_command    = var.lambda_rest_api_container_command
}


## SQS Lambda
module "lambda_sqs_worker" {
  source = "./modules/lambda"

  db_host              = var.db_host
  db_port              = var.db_port
  db_user              = var.db_user
  db_password          = var.db_password
  db_name              = var.db_name
  lambda_function_name = var.lambda_sqs_function_name
  image_uri            = module.ecr.image_uri
  container_command    = var.lambda_sqs_container_command
}

module "api_gateway" {
  source = "./modules/api_gateway"

  lambda_invoke_arn    = module.lambda.invoke_arn
  lambda_function_name = module.lambda.function_name
}

module "sqs" {
  source = "./modules/sqs"
}

data "aws_iam_policy_document" "sqs_consumer" {
  statement {
    effect = "Allow"
    actions = [
      "sqs:ReceiveMessage",
      "sqs:DeleteMessage",
      "sqs:GetQueueAttributes",
      "sqs:ChangeMessageVisibility"
    ]
    resources = [module.sqs.queue_arn]
  }
}

resource "aws_iam_role_policy" "sqs_consumer" {
  role   = module.lambda_sqs_worker.role_name
  policy = data.aws_iam_policy_document.sqs_consumer.json
}

resource "aws_lambda_event_source_mapping" "sqs_lambda_mapping" {
  event_source_arn = module.sqs.queue_arn
  function_name    = module.lambda_sqs_worker.function_name
  function_response_types = [
    "ReportBatchItemFailures"
  ]
  batch_size = 10

  scaling_config {
    maximum_concurrency = 100
  }
}
