.PHONY: tf-init tf-plan tf-apply tf-destroy tf-fmt tf-validate email-templates

TF_DIR := terraform
EMAIL_TEMPLATES_DIR := email-templates

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

email-templates:
	cd $(EMAIL_TEMPLATES_DIR) && aws --endpoint-url=http://localhost:4566 s3 cp *.html s3://email-templates/ --checksum-algorithm SHA256

