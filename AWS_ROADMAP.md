# AWS Full-Stack Learning Roadmap

A structured guide for learning AWS to build and deploy full-stack apps with
NestJS + React/Astro + PostgreSQL.

---

## 🖥️ Frontend & Content Delivery

| Service | Purpose |
|---|---|
| **S3** | Host static frontend assets (React/Vite/Astro builds) |
| **CloudFront** | CDN — fast global delivery, HTTPS, edge caching |
| **Route 53** | DNS management & custom domains |

---

## ⚙️ Backend & Compute

| Service | Purpose |
|---|---|
| **EC2** | Virtual machines — full control, run NestJS/Node servers |
| **ECS / Fargate** | Run Docker containers without managing servers |
| **Lambda** | Serverless functions — pay-per-request, great for APIs |
| **Elastic Beanstalk** | Easiest way to deploy Node/NestJS apps (PaaS-style) |

---

## 🌐 API Layer

| Service | Purpose |
|---|---|
| **API Gateway** | Create REST/HTTP/WebSocket APIs, connects to Lambda or backends |
| **App Runner** | Simplest way to deploy containerized web services |

---

## 🗄️ Databases

| Service | Purpose |
|---|---|
| **RDS (PostgreSQL)** | Managed relational DB — direct replacement for your local Postgres |
| **DynamoDB** | Serverless NoSQL — great for high-scale, simple data models |
| **ElastiCache (Redis)** | In-memory caching & session storage |

---

## 🔐 Auth & Security

| Service | Purpose |
|---|---|
| **Cognito** | User pools, sign-up/login, JWT tokens — drop-in auth |
| **IAM** | Roles, policies, permissions — foundational to everything |
| **Secrets Manager** | Store DB passwords, API keys securely |

---

## 📦 Storage & Media

| Service | Purpose |
|---|---|
| **S3** | Object storage — file uploads, backups, assets |
| **SES** | Transactional email (sign-up confirmations, notifications) |

---

## 🔄 Async / Events

| Service | Purpose |
|---|---|
| **SQS** | Message queues — decouple services, background jobs |
| **SNS** | Pub/sub notifications — fan-out events to multiple consumers |
| **EventBridge** | Event bus — orchestrate loosely coupled services |

---

## 🚀 CI/CD & DevOps

| Service | Purpose |
|---|---|
| **CodePipeline** | Automated build → test → deploy pipelines |
| **ECR** | Docker image registry (store your container images) |
| **CloudWatch** | Logs, metrics, alarms, dashboards |

---

## 🗺️ Learning Path

Work through these phases in order. Each phase builds on the previous one.

### Phase 1 — Deploy a Static Frontend
> Goal: get your React/Astro build live on a real URL.

- [ ] Create an S3 bucket and enable static website hosting
- [ ] Upload a Vite/Astro production build (`dist/`)
- [ ] Put CloudFront in front of the bucket (HTTPS + CDN)
- [ ] Point a custom domain with Route 53

### Phase 2 — Managed Database
> Goal: replace local PostgreSQL with a cloud-hosted one.

- [ ] Provision an RDS PostgreSQL 16 instance
- [ ] Configure security groups (only your backend can connect)
- [ ] Store the `DATABASE_URL` in Secrets Manager
- [ ] Connect your NestJS app to RDS locally via an SSH tunnel

### Phase 3 — Deploy the NestJS Backend
> Goal: run your containerised backend in the cloud.

- [ ] Write a production `Dockerfile` for the NestJS app
- [ ] Push the image to ECR (Elastic Container Registry)
- [ ] Deploy the container to ECS Fargate with a task definition
- [ ] Expose the service via an Application Load Balancer
- [ ] Pull secrets from Secrets Manager at runtime via IAM roles

### Phase 4 — Add Auth
> Goal: production-ready user sign-up / login.

- [ ] Create a Cognito User Pool with email/password sign-up
- [ ] Add a Cognito App Client for the frontend
- [ ] Integrate the Cognito JWT into your NestJS guards
- [ ] Lock down API Gateway or ALB routes by Cognito authorizer

### Phase 5 — Async Jobs & Events
> Goal: offload slow work to background workers.

- [ ] Create an SQS queue for background tasks
- [ ] Publish messages from NestJS (e.g. after a user signs up)
- [ ] Write a Lambda consumer that reads from the queue
- [ ] Use SES to send transactional emails from the Lambda

### Phase 6 — Observability & CI/CD
> Goal: know when things break and ship changes automatically.

- [ ] Ship structured logs from NestJS to CloudWatch Logs
- [ ] Create CloudWatch alarms for error rates and latency
- [ ] Set up a CodePipeline: GitHub push → build → ECR push → ECS deploy
- [ ] Add a pipeline stage that deploys the frontend to S3 + invalidates CloudFront

---

## 🔗 Stack Mapping

| Local / Repo | AWS Service |
|---|---|
| Vite / Astro `dist/` output | S3 + CloudFront |
| NestJS backend | ECS Fargate or App Runner |
| Local PostgreSQL (Docker) | RDS PostgreSQL |
| `.env` secrets | Secrets Manager |
| Auth (JWT) | Cognito |
| Background jobs | SQS + Lambda |
| Docker images | ECR |
| Logs & metrics | CloudWatch |
| Custom domain | Route 53 |

---

## 📌 Quick-Start Priority

If you only have time to learn three things first, learn these:

1. **IAM** — you cannot use anything else safely without understanding roles and policies.
2. **S3 + CloudFront** — deploy your frontend in under an hour.
3. **RDS + ECS Fargate** — run your NestJS + PostgreSQL stack in the cloud.
