output "repository_url" {
  value = aws_ecr_repository.this.repository_url
}

# We are outpiting formatted URI to the image 
# To pass it down to other components like Lambda etc.
output "image_uri" {
  value = "${local.registry}${var.ecr_registry_port}/${local.repo}:${var.image_tag}"
}

