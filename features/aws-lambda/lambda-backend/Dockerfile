FROM public.ecr.aws/lambda/nodejs:22

# copy dist 
COPY pruned/node_modules/ ${LAMBDA_TASK_ROOT}/node_modules/
COPY dist/ ${LAMBDA_TASK_ROOT}/dist/

# set the CMD to handler 
CMD ["dist/lambda.handler"]
