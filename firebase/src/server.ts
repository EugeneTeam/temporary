import express, { Application } from 'express';

import './firebase/connection'

import { userRouterInfo } from './routers/user/user.router';
import bodyParser from "body-parser";

const app: Application = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(userRouterInfo)

app.listen(3000, () => {
  console.log('Server start on port: 3000')
})