import { Passport as Pass } from 'passport';
import {
  Profile,
  VerifyFunction
} from 'passport-facebook-token';
import { credentials } from './auth-tokens';

export class Passport {
  public static get instance() {
    if (!Passport.passport) {
      Passport.initialize();
    }
    return Passport.passport;
  }
  private static passport: any;
  private static initialize() {
    Passport.passport = new Pass();
    const FacebookTokenStrategy = require('passport-facebook-token');
    const strategyOptions = credentials.facebook;
    const verifyFunction: VerifyFunction = (accessToken: string, refreshToken: string, profile: Profile,
                                            done: (error: any, user?: any, info?: any) => void) => {
      console.log(accessToken);
      console.log(refreshToken);
      console.log(profile);
      console.log('Verifying.---------------------------');
      // Database.instance.addUserIfNotExist(accessToken, refreshToken, profile)
      // .then((user: Customer) => {
      //   done(null, user);
      // })
      // .catch((err) => {
      //   done(err, null);
      // });

      const  user = {
        email: profile.emails[0].value,
        facebookProvider: {
              id: profile.id,
              token: accessToken
        }
      };
      done(null, user);
    };
    const strategy = new FacebookTokenStrategy(strategyOptions, verifyFunction);
    Passport.instance.use(strategy);
  }
}
