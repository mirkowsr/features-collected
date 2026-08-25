# HTTP API GATEWAY
resource "aws_apigatewayv2_api" "http" {
  name          = "${var.lambda_function_name}-api-gateway"
  protocol_type = "HTTP"
}

# INTEGRATION (API → LAMBDA)
resource "aws_apigatewayv2_integration" "lambda" {
  api_id                 = aws_apigatewayv2_api.http.id
  integration_type       = "AWS_PROXY"
  integration_uri        = var.lambda_invoke_arn 
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
  function_name = var.lambda_function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.http.execution_arn}/*"
}
