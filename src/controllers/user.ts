import { RequestHandler, Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

import { IUser, User, UserDocument } from "../models/user";
import "../authservice/passportHandeler";
import passport from "passport";
import { IVerifyOptions } from "passport-local";

export class UserController {
  public async getSignup(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    // TODO: Get signup page using svelte
    res.status(200).json({ message: "Signup page" });
  }

  public async postSignup(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { username, password } = req.body as IUser;

    // check existence of user and if user already exist return error
    const existingUser = await User.findOne({ username: username });

    if (existingUser) {
      res.status(409).json({ message: "User already exist" });
      return;
    }

    const user = new User({ username, password });
    await user.save();

    res
      .status(201)
      .json({ message: "User already has been created", UserId: user._id });
  }

  public async getLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    // TODO: Get login page using svelte
    res.status(200).json({ message: "Login page" });
  }

  public async postLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
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
  }
}
