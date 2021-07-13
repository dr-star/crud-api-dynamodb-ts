import {DynamoDB} from "aws-sdk";
import {DocumentClient} from "aws-sdk/lib/dynamodb/document_client";

const dynamoDb = new DynamoDB.DocumentClient();

export async function main(event: any) {
    const params: DocumentClient.QueryInput = {
        TableName: !process.env.tableName ? '' : process.env.tableName,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ":userId": event.requestContext.authorizer.iam.cognitoIdentity.identityId,
        },
    };

    const results = await dynamoDb.query(params).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(results.Items),
    };

}
