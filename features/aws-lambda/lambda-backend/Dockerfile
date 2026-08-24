# ---- Stage 1: build a self-contained dependency bundle ----
FROM node:22-alpine AS deps
RUN npm install -g pnpm@10
WORKDIR /usr/src/app

# Copy lockfile + workspace config so pnpm can resolve the workspace
COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY .npmrc ./

# Copy the lambda package manifest
COPY features/aws-lambda/lambda-backend/package.json ./features/aws-lambda/lambda-backend/

# pnpm deploy produces a self-contained, portable dependency bundle
RUN pnpm --filter @repo/aws-lambda-lambda-backend --prod deploy /app/bundle

# ---- Stage 2: Lambda runtime image ----
FROM public.ecr.aws/lambda/nodejs:22

# Copy the self-contained node_modules from the bundle
COPY --from=deps /app/bundle/node_modules ${LAMBDA_TASK_ROOT}/node_modules

# Copy the compiled NestJS output
COPY features/aws-lambda/lambda-backend/dist/ ${LAMBDA_TASK_ROOT}/dist/

CMD ["dist/lambda.handler"]
