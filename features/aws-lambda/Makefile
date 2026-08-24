.PHONY: tf-init tf-plan tf-apply tf-destroy tf-fmt tf-validate build prune docker-build ecr-tag ecr-push ecr-deploy 

TF_DIR := features/aws-lambda/terraform


ECR_HOST  := localhost:4566
ECR_REPO  := aws-lambda-backend
IMAGE     := aws-lambda-backend
GIT_SHA   := $(shell git rev-parse --short HEAD)
BACKEND   := features/aws-lambda/lambda-backend

tf-init:
	cd $(TF_DIR) && terraform init

tf-plan:
	cd $(TF_DIR) && terraform plan

tf-apply:
	cd $(TF_DIR) && terraform apply

tf-destroy:
	cd $(TF_DIR) && terraform destroy

tf-fmt:
	cd $(TF_DIR) && terraform fmt

tf-validate:
	cd $(TF_DIR) && terraform validate

build:
	pnpm --filter @repo/aws-lambda-lambda-backend build

prune: build
	rm -rf pruned
	rm -rf ${BACKEND}/pruned
	pnpm --filter @repo/aws-lambda-lambda-backend deploy pruned

docker-build: prune
	docker build --provenance=false -t $(IMAGE):$(GIT_SHA) $(BACKEND)

ecr-tag:
	docker tag $(IMAGE):$(GIT_SHA) $(ECR_HOST)/$(ECR_REPO):$(GIT_SHA)
	docker tag $(IMAGE):$(GIT_SHA) $(ECR_HOST)/$(ECR_REPO):latest

ecr-push: ecr-tag
	docker push $(ECR_HOST)/$(ECR_REPO):$(GIT_SHA)
	docker push $(ECR_HOST)/$(ECR_REPO):latest

ecr-deploy: docker-build ecr-push
	rm -rf pruned
	rm -rf $(BACKEND)/pruned
	@echo "Pushed $(ECR_HOST)/$(ECR_REPO):$(GIT_SHA) and :latest"
