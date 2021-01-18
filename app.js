import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { serverPort } from './etc/config.json';
import {router as accountRoutes} from './routes/AccountApi';

import * as db from './utils/DataBaseUtils';

// Initialization of express application
const app = express();

// Set up connection of database
db.setUpConnection();

// Using bodyParser middleware
app.use( bodyParser.json() );

// Allow requests from any origin
app.use(cors({ origin: '*' }));

console.log(__dirname)
app.use(express.static(__dirname + '/public'));


// Allow routes
app.use(accountRoutes)



const server = app.listen(serverPort, function() {
    console.log(`Server is up and running on port ${serverPort}`);
});