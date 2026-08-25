output "repository_url" {
  value = aws_ecr_repository.aws-lambda-backend.repository_url
}

output "image_uri" {
  value = format("%s.dkr.ecr.%s.amazonaws.com%s/%s:%s",
    var.account_id,
    var.region,
    var.ecr_registry_port,
    var.repository_name,
    var.image_tag,
  )
}

