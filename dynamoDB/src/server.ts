import {Application, Request, Response} from 'express';
import express from 'express';

import {
  AttributeValue,
  CreateTableCommand,
  DeleteItemCommand,
  DynamoDBClient,
  GetItemCommand,
  ListTablesCommand,
  PutItemCommand,
  UpdateItemCommand,
  UpdateItemCommandInput
} from "@aws-sdk/client-dynamodb";

import { CONFIG, CREATE_TABLE_OPTIONS } from "./config";
import bodyParser from "body-parser";

const dbClient = new DynamoDBClient(CONFIG);

const app: Application = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.post('/create-table', (req: Request, res: Response): void => {
  dbClient.send(new CreateTableCommand(CREATE_TABLE_OPTIONS))
    .then(() => {
      return res.status(200).json({
        status: 'Table created'
      });
    })
    .catch(error => {
      return res.status(400).json({
        status: 'Error',
        details: error,
      });
    });
});

app.get('/get-tables', (req: Request, res: Response): void => {
  const limit = req.query?.limit;
  dbClient.send(new ListTablesCommand({
  Limit: limit ? Number(limit) : 10,
}))
    .then(response => {
        return res.status(200).json(response);
    })
    .catch(error => {
      return res.status(400).json({
        status: 'Error',
        details: error,
      });
    });
});


app.post('/add-item', (req: Request, res: Response): void => {
  const item: Record<string, AttributeValue> = req.body.item;

  dbClient.send(new PutItemCommand({
  TableName: CREATE_TABLE_OPTIONS.TableName,
  Item: item,
  // Item: {
  //   id: {
  //     N: '3'
  //   },
  //   title: {
  //     S: 'Test title'
  //   },
  //   isValid: {
  //     BOOL: true
  //   },
  // },
  ReturnConsumedCapacity: 'TOTAL'
}))
    .then(() => {
      return res.status(200).json({
        status: 'Item added'
      });
    })
    .catch(error => {
      return res.status(400).json({
        status: 'Error',
        details: error,
      });
    });
});

app.patch('/update-item', (req: Request, res: Response): void => {
  const params: UpdateItemCommandInput = {
    TableName: CREATE_TABLE_OPTIONS.TableName,
    Key: {
      id: {
        N: "3"
      },
    },
    ExpressionAttributeValues: {
      ':val': {
        S: 'updateTest'
      }
    },
    UpdateExpression: 'set title = :val'
  }
  dbClient.send(new UpdateItemCommand(params))
    .then(() => {
      return res.status(200).json({
        status: 'Item updated'
      });
    })
    .catch(error => {
      return res.status(400).json({
        status: 'Error',
        details: error,
      });
    });
});


app.get('/item/:id', (req: Request, res: Response) => {
  dbClient.send(new GetItemCommand({
    TableName: CREATE_TABLE_OPTIONS.TableName,
    Key: {
      id: {
        N: req.params.id
      }
    }
  }))
    .then(response => {
      return res.status(200).json(response);
    })
    .catch(error => {
      return res.status(400).json({
        status: 'Error',
        details: error,
      });
    });
})


app.delete('/item/:id', (req: Request, res: Response) => {
  dbClient.send(new DeleteItemCommand({
    TableName: CREATE_TABLE_OPTIONS.TableName,
    Key: {
      id: {
        N: '3'
      }
    }
  }))
    .then(response => {
      return res.status(200).json({
        status: 'Item deleted'
      });
    })
    .catch(error => {
      return res.status(400).json({
        status: 'Error',
        details: error,
      });
    });
})

app.listen(3000, () => {
  console.log('server is start...')
})