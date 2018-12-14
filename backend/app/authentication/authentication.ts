import { sign } from 'jsonwebtoken';
import { Database } from '../database/database';
import { Customer } from '../../commonClasses';
import jwt = require('express-jwt');

function createToken(auth: {id: string}) {
  const payload = {
    id: auth.id
  };
  const secret = 'my-secret';
  const tokenOptions = {
    expiresIn: 60 * 120
  };
  const result = sign(payload, secret, tokenOptions);
  return result;
}

export function generateAndSendToken(req: any, res: any, next: any) {
  req.token = createToken(req.authInfo);
  res.setHeader('x-auth-token', req.token);
  res.status(200).send(req.auth);
  console.log('done generating');
}

const options: jwt.Options = {
  secret: 'my-secret',
  requestProperty: 'auth',
  getToken: function(req: any) {
    if (req.headers['x-auth-token']) {
      return req.headers['x-auth-token'];
    }
    return null;
  }
};
export const authenticate = jwt(options);

export function getCurrentUser(req: any, res: any, next: any) {
  Database.instance.findById(req.auth.id)
  .then((customer: Customer) => {
    req.user = customer;
    next();
  })
  .catch((err) => {
    next(err);
  });
}

export function getOne(req: any, res: any) {
  const user = req.user.toObject();
  delete user['facebookProvider'];
  delete user['__v'];
  res.json(user);
}
