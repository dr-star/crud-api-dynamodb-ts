import {DynamoDB} from "aws-sdk";
import {DocumentClient} from "aws-sdk/lib/dynamodb/document_client";

const dynamoDb = new DynamoDB.DocumentClient();

export async function main(event: any) {

    const data: any = JSON.stringify(event.body);

    const params: DocumentClient.UpdateItemInput = {
        TableName: !process.env.tableName ? '' : process.env.tableName,
        Key: {
            userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId,
            noteId: event.pathParameters.id,
        },
        UpdateExpression: "SET content = :content",
        ExpressionAttributeValues: {
            ":content": data.content || null,
        },
        ReturnValues: "ALL_NEW"
    };

    const results = await dynamoDb.update(params).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(results.Attributes),
    };

}
