.PHONY: tf-init tf-plan tf-apply tf-destroy tf-fmt tf-validate build prune docker-build ecr-tag ecr-push ecr-deploy 

TF_DIR := features/aws-lambda/terraform

ECR_HOST  := 000000000000.dkr.ecr.us-east-1.amazonaws.com:4566
ECR_REPO  := aws-lambda-backend
IMAGE     := aws-lambda-backend
GIT_SHA   := $(shell git rev-parse --short HEAD)
BACKEND   := features/aws-lambda/lambda-backend

tf-init:
	cd $(TF_DIR) && terraform init

tf-plan:
	cd $(TF_DIR) && terraform plan  -var="image_tag=$(GIT_SHA)"

tf-apply:
	cd $(TF_DIR) && terraform apply -var="image_tag=$(GIT_SHA)"

tf-apply-ecr:
	cd $(TF_DIR) && terraform apply -target=module.ecr -var="image_tag=$(GIT_SHA)"

rollback:
	cd $(TF_DIR) && terraform apply -var="image_tag=$(SHA)"

tf-destroy:
	cd $(TF_DIR) && terraform destroy -var="image_tag=irrevelant_here"

tf-fmt:
	cd $(TF_DIR) && terraform fmt

tf-validate:
	cd $(TF_DIR) && terraform validate

build:
	pnpm --filter @repo/aws-lambda-lambda-backend build

prune: build
	pnpm --filter @repo/aws-lambda-lambda-backend deploy $(BACKEND)/pruned

docker-build: build
	docker build --platform=linux/amd64 --provenance=false -t $(IMAGE):$(GIT_SHA) -f  $(BACKEND)/Dockerfile .

ecr-tag:
	docker tag $(IMAGE):$(GIT_SHA) $(ECR_HOST)/$(ECR_REPO):$(GIT_SHA)
	docker tag $(IMAGE):$(GIT_SHA) $(ECR_HOST)/$(ECR_REPO):latest

ecr-push: ecr-tag
	docker push $(ECR_HOST)/$(ECR_REPO):$(GIT_SHA)
	docker push $(ECR_HOST)/$(ECR_REPO)

ecr-deploy: docker-build ecr-push
	@echo "Pushed $(ECR_HOST)/$(ECR_REPO):$(GIT_SHA)"

deploy: ecr-push tf-apply

bootstrap: tf-apply-ecr ecr-deploy tf-apply
