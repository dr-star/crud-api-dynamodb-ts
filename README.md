# Getting Started with Serverless Stack (SST)

This project was bootstrapped with [Create Serverless Stack](https://docs.serverless-stack.com/packages/create-serverless-stack).

Start by installing the dependencies.

```bash
$ npm install
```

## Commands

### `npm run start`

Starts the local Lambda development environment.

### `npm run build`

Build your app and synthesize your stacks.

Generates a `.build/` directory with the compiled files and a `.build/cdk.out/` directory with the synthesized CloudFormation stacks.

### `npm run deploy [stack]`

Deploy all your stacks to AWS. Or optionally deploy a specific stack.

### `npm run remove [stack]`

Remove all your stacks and all of their resources from AWS. Or optionally remove a specific stack.

### `npm run test`

Runs your tests using Jest. Takes all the [Jest CLI options](https://jestjs.io/docs/en/cli).

## Create Cognito account


```bash
aws cognito-idp sign-up --region eu-central-1 --client-id xxx --username some@email.com --password Passw0rd!
```

```bash
aws cognito-idp admin-confirm-sign-up --region eu-central-1 --user-pool-id xxx --username some@email.com
```

## Create Note

```bash
npx aws-api-gateway-cli-test --username="some@email.com" --password="Passw0rd!"  --user-pool-id="xxx" --app-client-id="xxx" --cognito-region="eu-central-1" --identity-pool-id="xxx"  --invoke-url="xxx" --api-gateway-region="eu-central-1" --path-template="/notes" --method="POST" --body="{\"content\":\"Hello World\"}"
```

## Get Note
```bash
npx aws-api-gateway-cli-test --username="some@email.com" --password="Passw0rd!"  --user-pool-id="xxx" --app-client-id="xxx" --cognito-region="eu-central-1" --identity-pool-id="xxx"  --invoke-url="xxx" --api-gateway-region="eu-central-1" --path-template="/notes/xxx" --method="GET"
```
## Delete Note
```bash
npx aws-api-gateway-cli-test --username="some@email.com" --password="Passw0rd!"  --user-pool-id="xxx" --app-client-id="xxx" --cognito-region="eu-central-1" --identity-pool-id="xxx"  --invoke-url="xxx" --api-gateway-region="eu-central-1" --path-template="/notes/xxx" --method="DELETE"
```
