
const { v4: uuidv4 } = require('uuid');
const { TABLE_NAME } = require("../constants");

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

const {
    DynamoDBDocumentClient,
    ScanCommand,
    PutCommand,
    GetCommand,
    DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");


const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

async function createCabin(event, context) {
    console.log("event => ", event);

    let body;
    let statusCode = 200;
    const headers = {
        "Content-Type": "application/json",
    };

    try {
        let requestJSON = event;

        const id = uuidv4(); // Generate a new ID

        await dynamo.send(
            new PutCommand({
                TableName: TABLE_NAME,
                Item: {
                    id: id,
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

module.exports = {
    createCabin,
}