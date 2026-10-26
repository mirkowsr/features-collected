# ---- Stage 1: build the Lambda and its workspace dependencies ----
FROM node:22-alpine AS build
RUN npm install -g pnpm@10
WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc tsconfig.base.json turbo.json ./
COPY packages/ ./packages/
COPY utils/ ./utils/
COPY features/aws-lambda/lambda-backend/package.json ./features/aws-lambda/lambda-backend/
COPY features/aws-lambda/lambda-backend/tsconfig.json ./features/aws-lambda/lambda-backend/
COPY features/aws-lambda/lambda-backend/nest-cli.json ./features/aws-lambda/lambda-backend/
COPY features/aws-lambda/lambda-backend/src/ ./features/aws-lambda/lambda-backend/src/

RUN pnpm install --frozen-lockfile
RUN pnpm build

# pnpm deploy produces a self-contained, portable production dependency bundle.
RUN pnpm deploy --filter @repo/aws-lambda-lambda-backend --prod /app/bundle

# ---- Stage 2: Lambda runtime image ----
FROM public.ecr.aws/lambda/nodejs:22

# Copy the self-contained node_modules from the bundle
COPY --from=build /app/bundle/node_modules ${LAMBDA_TASK_ROOT}/node_modules

# Copy the compiled NestJS output
COPY --from=build /usr/src/app/features/aws-lambda/lambda-backend/dist/ ${LAMBDA_TASK_ROOT}/dist/
