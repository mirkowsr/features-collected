locals {
  registry = split("/", aws_ecr_repository.this.repository_url)[0]
  repo     = trimprefix(aws_ecr_repository.this.repository_url, "${local.registry}/")
}
