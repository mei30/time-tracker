import { RequestHandler, Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

import { IUser, User, UserDocument } from "../models/user";
import "../authservice/passportHandeler";
import passport from "passport";
import { IVerifyOptions } from "passport-local";

export class UserController {
  getSignup: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // TODO: Get signup page using svelte
    res.status(200).json({ message: "Signup page" });
  };

  postSignup: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { username, password } = req.body as IUser;

    // check existence of user and if user already exist return error
    const existingUser = await User.findOne({ username: username });

    if (existingUser) {
      return res.status(409).json({ message: "User already exist" });
    }

    const user = new User({ username, password });
    await user.save();

    res
      .status(201)
      .json({ message: "User already has been created", UserId: user._id });
  };

  getLogin: RequestHandler = (req, res, next) => {
    // TODO: Get login page using svelte
    res.status(200).json({ message: "Login page" });
  };

  postLogin: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    passport.authenticate(
      "local",
      (error: Error, user: UserDocument, info: IVerifyOptions) => {
        if (error) {
          return next(error);
        }

        if (!user) {
          res.status(401).json({ message: info.message });
        } else {
          // jwt token
          const jwtPayload: jwt.JwtPayload = { sub: user._id.toString() };

          // TODO: Secret and token expireation time should be configurable.
          const token: string = jwt.sign(jwtPayload, "supersecret", {
            expiresIn: "1h",
          });
          res.status(200).json({ token: token });
        }
      }
    )(req, res, next);
  };
}
