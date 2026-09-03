provider "aws" {
  region                      = var.aws_region
  access_key                  = var.aws_access_key_id
  secret_key                  = var.aws_secret_access_key
  s3_use_path_style           = var.emulator
  skip_credentials_validation = var.emulator
  skip_requesting_account_id  = var.emulator
  skip_metadata_api_check     = var.emulator

  endpoints {
    ecr          = var.aws_endpoint_host
    apigatewayv2 = var.aws_endpoint_host
    iam          = var.aws_endpoint_host
    sts          = var.aws_endpoint_host
    lambda       = var.aws_endpoint_host
    sqs          = var.aws_endpoint_host
    logs         = var.aws_endpoint_host
    cloudwatch   = var.aws_endpoint_host
  }
}

locals {
  sqs_queue_url = "${var.aws_endpoint_network}/${var.aws_account_id}/${var.queue_name}"
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

  db_host               = var.db_host
  db_port               = var.db_port
  db_user               = var.db_user
  db_password           = var.db_password
  db_name               = var.db_name
  lambda_function_name  = var.lambda_function_name
  image_uri             = module.ecr.image_uri
  container_command     = var.lambda_rest_api_container_command
  sqs_endpoint          = var.aws_endpoint_network
  sqs_queue_url         = local.sqs_queue_url
  aws_region            = var.aws_region
  aws_access_key_id     = var.aws_access_key_id
  aws_secret_access_key = var.aws_secret_access_key
}


## SQS Lambda
module "lambda_sqs_worker" {
  source = "./modules/lambda"

  db_host               = var.db_host
  db_port               = var.db_port
  db_user               = var.db_user
  db_password           = var.db_password
  db_name               = var.db_name
  lambda_function_name  = var.lambda_sqs_function_name
  image_uri             = module.ecr.image_uri
  container_command     = var.lambda_sqs_container_command
  sqs_endpoint          = var.aws_endpoint_network
  sqs_queue_url         = local.sqs_queue_url
  aws_region            = var.aws_region
  aws_access_key_id     = var.aws_access_key_id
  aws_secret_access_key = var.aws_secret_access_key
}

module "api_gateway" {
  source = "./modules/api_gateway"

  lambda_invoke_arn    = module.lambda.invoke_arn
  lambda_function_name = module.lambda.function_name
}

module "sqs" {
  source     = "./modules/sqs"
  queue_name = var.queue_name
  dlq_name   = var.dlq_name
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


data "aws_iam_policy_document" "sqs_producer" {
  statement {
    effect = "Allow"
    actions = [
      "sqs:SendMessage",
    ]
    resources = [module.sqs.queue_arn]
  }
}

resource "aws_iam_role_policy" "sqs_consumer" {
  role   = module.lambda_sqs_worker.role_name
  policy = data.aws_iam_policy_document.sqs_consumer.json
}


resource "aws_iam_role_policy" "sqs_producer" {
  role   = module.lambda.role_name
  policy = data.aws_iam_policy_document.sqs_producer.json
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
