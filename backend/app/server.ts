import express from 'express';
import bodyParser from 'body-parser';
import {
  WelcomeController,
  APIController
} from './controllers';
import { Passport } from './authentication/passport';

const app: express.Application = express();
const passport = Passport.instance;
const corsSetupFunction = (req: any, res: any, next: any) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
};
const port = 3000;

app.use(passport.initialize());
app.use(passport.session());
app.use(corsSetupFunction);
app.use(bodyParser.json());
app.use('/welcome', WelcomeController);
app.use('/api', APIController);
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
