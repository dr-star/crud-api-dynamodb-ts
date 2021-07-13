import * as sst from "@serverless-stack/resources";

export default class MyStack extends sst.Stack {
    constructor(scope: sst.App, id: string, props?: sst.StackProps) {
        super(scope, id, props);

        const table = new sst.Table(this, "Notes", {
            fields: {
                userId: sst.TableFieldType.STRING,
                noteId: sst.TableFieldType.STRING
            },
            primaryIndex: {
                partitionKey: "userId",
                sortKey: "noteId",
            },
        });

        const api = new sst.Api(this, "Api", {
            defaultAuthorizationType: sst.ApiAuthorizationType.AWS_IAM,
            defaultFunctionProps: {
                environment: {
                    tableName: table.dynamodbTable.tableName,
                },
            },
            routes: {
                "GET /notes": "src/list.main",
                "POST /notes": "src/create.main",
                "GET /notes/{id}": "src/get.main",
                "PUT /notes/{id}": "src/update.main",
                "DELETE /notes/{id}": "src/delete.main",
            },
        });

        const auth = new sst.Auth(this, "Auth", {
            cognito: {
                userPool: {
                    userPoolName: "api-auth-user",
                    signInAliases: {
                        email: true,
                    },
                },
            },
        });

        auth.attachPermissionsForAuthUsers([api]);

        api.attachPermissions([table]);
        // Show the endpoint in the output
        this.addOutputs({
            ApiEndpoint: api.url,
            UserPoolId: auth.cognitoUserPool!.userPoolId ,
            IdentityPoolId: auth.cognitoCfnIdentityPool.ref,
            UserPoolClientId: auth.cognitoUserPoolClient!.userPoolClientId,
        });
    }
}
