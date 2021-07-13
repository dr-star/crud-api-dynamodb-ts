import {DynamoDB} from "aws-sdk";
import {DocumentClient} from "aws-sdk/lib/dynamodb/document_client";

const dynamoDb = new DynamoDB.DocumentClient();

export async function main() {
    const params: DocumentClient.QueryInput = {
        TableName: !process.env.tableName ? '' : process.env.tableName,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ":userId": "123",
        },
    };

    const results = await dynamoDb.query(params).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(results.Items),
    };

}
