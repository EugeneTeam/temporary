import { config } from 'dotenv'
config();

import { CreateTableCommandInput } from "@aws-sdk/client-dynamodb";

export const CONFIG = {
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: 'ap-northeast-1',
}

export const CREATE_TABLE_OPTIONS: CreateTableCommandInput = {
    TableName: 'malevichtesttable',
    AttributeDefinitions: [
        {
            AttributeName: 'id',
            AttributeType: 'N'
        }
    ],
    ProvisionedThroughput: {
        // The maximum number of strongly consistent reads consumed per second before DynamoDB returns a ThrottlingException.
        // For more information, see Specifying Read and Write Requirements in the Amazon DynamoDB Developer Guide.
        ReadCapacityUnits: 5,
        // The maximum number of writes consumed per second before DynamoDB returns a ThrottlingException.
        // For more information, see Specifying Read and Write Requirements in the Amazon DynamoDB Developer Guide.
        WriteCapacityUnits: 5
    },
    KeySchema: [
        {
            AttributeName: 'id',
            KeyType: 'HASH'
        },
    ]
}