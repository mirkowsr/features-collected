output "ecr_repository_url" {
  value = aws_ecr_repository.aws-lambda-backend.repository_url
}

output "api_invoke_url" {
  value       = aws_apigatewayv2_api.http.api_endpoint
  description = "Base URL for the API ($default stage)"
}
