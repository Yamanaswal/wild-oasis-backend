import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

import {
    DynamoDBDocumentClient,
    ScanCommand,
    PutCommand,
    GetCommand,
    DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import { TABLE_NAME } from "../index.js";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

export async function createCabin(event, context) {
    console.log("event => ", event);

    let body;
    let statusCode = 200;
    const headers = {
        "Content-Type": "application/json",
    };

    try {

        let requestJSON = JSON.parse(event.body);

        await dynamo.send(
            new PutCommand({
                TableName: TABLE_NAME,
                Item: {
                    id: requestJSON.id,
                    price: requestJSON.price,
                    name: requestJSON.name,
                },
            })
        );

        body = `Put item ${requestJSON.id}`;

    }
    catch (err) {
        statusCode = 400;
        body = err.message;
    }
    finally {
        body = JSON.stringify(body);
    }

    return {
        statusCode,
        body,
        headers,
    };
}