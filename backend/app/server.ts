/* app/server.ts */

// Import everything from express and assign it to the express variable
import express from 'express';
import bodyParser from 'body-parser';

import { Connection, ConnectionConfig } from 'tedious';

// Import WelcomeController from controllers entry point
import { WelcomeController } from './controllers';
import { APIController } from './controllers';

// Create a new express application instance
const app: express.Application = express();

app.use((req, res, next) => {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log("requesting!!!");
    console.log(req.headers['authorization']);
    // next();
    res.status(401).send({'error': 'die!'});
    // next();
});

// The port the express app will listen on
const port: number = 3000;

// Mount the WelcomeController at the /welcome route
app.use('/welcome', WelcomeController);
app.use('/api', APIController)
// Serve the application at the given port
app.listen(port, () => {
    // Success callback
    console.log(`Listening at http://localhost:${port}/`);
});
