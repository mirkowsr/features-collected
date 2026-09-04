# Example of lambda architecture with sqs

## Further considerations, when using this boilerplate

- lambdas share the same db which is fine for now but might not be the best
- db coupling might kick in the ass, but this is just an example of lambda fn architecture
- naturally we should:
  - do some sort of body validation at controller level in our rest api
  - do decent payload, not hardcoded one

Since scope of this feature and boilerplate is rather big, i limited this
