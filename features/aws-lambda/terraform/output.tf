output "api_invoke_url" {
  value       = module.api_gateway.api_endpoint
  description = "Base URL for the API ($default stage)"
}

output "sqs_queue_url" {
  value = module.sqs.queue_url

}
