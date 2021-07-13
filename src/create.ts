import {DynamoDB} from "aws-sdk";
import {DocumentClient} from "aws-sdk/lib/dynamodb/document_client";
import {v1} from "uuid";

const dynamoDb = new DynamoDB.DocumentClient();

export async function main(event: any) {

    const data = JSON.parse(event.body);

    const params: DocumentClient.PutItemInput = {
        TableName: !process.env.tableName ? '' : process.env.tableName,
        Item: {
            userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId,
            noteId: v1(),
            content: data.content,
            createdAt: Date.now(),
        },
    };

    await dynamoDb.put(params).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(params.Item),
    };


}
