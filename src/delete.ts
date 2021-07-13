import {DynamoDB} from "aws-sdk";
import {DocumentClient} from "aws-sdk/lib/dynamodb/document_client";

const dynamoDb = new DynamoDB.DocumentClient();

export async function main(event: any) {

    const params: DocumentClient.DeleteItemInput = {
        TableName: !process.env.tableName ? '' : process.env.tableName,
        Key: {
            userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId,
            noteId: event.pathParameters.id,
        },
    };

    const result = await dynamoDb.delete(params).promise();

    console.log(result );

    return {
        statusCode: 200,
        body: JSON.stringify({status: true}),
    };

}
