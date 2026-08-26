output "api_endpoint" {
  value = aws_apigatewayv2_api.http-api.api_endpoint
}

output "execution_arn" {
  value = aws_apigatewayv2_api.http-api.execution_arn
}
