import passport from "passport";
import * as passportLocal from "passport-local";
import * as passportJwt from "passport-jwt";
import { NativeError } from "mongoose";

import { IUser, User, UserDocument } from "../models/user";

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const Extratjwt = passportJwt.ExtractJwt;

passport.use(
  new LocalStrategy((username: string, password: string, done): void => {
    User.findOne(
      { username: username.toLowerCase() },
      (error: NativeError, user: any) => {
        if (error) {
          return done(error, false);
        }

        if (!user) {
          return done(undefined, false, {
            message: `Username ${username} not found`,
          });
        }

        user.comparePassword(password, (error: Error, same: boolean) => {
          if (error) {
            return done(error);
          }

          if (same) {
            return done(undefined, user);
          }

          return done(undefined, false, {
            message: `Invalid username or password`,
          });
        });
      }
    );
  })
);

passport.use(
  new JwtStrategy(
    {
      secretOrKey: "supersecret",
      jwtFromRequest: Extratjwt.fromAuthHeaderAsBearerToken(),
    },
    (jwtPayload, done) => {
      User.findById(jwtPayload.sub, (error: NativeError, user: any) => {
        if (error) {
          return done(error, false, {message: 'error'});
        }

        if (user) {
          return done(undefined, user, {message: 'user found'});
        } else {
          return done(undefined, false, {message: 'user does not exist'});
        }
      });
    }
  )
);
