import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { IVerifyOptions } from "passport-local";

import "../authservice/passportHandeler";
import { UserDocument } from "../models/user";

export class AuthController {
  authenticateJwt(req: Request, res: Response, next: NextFunction) {
    passport.authenticate(
      "jwt",
      (error: Error, user: UserDocument, info: IVerifyOptions) => {
        if (error) {
          return next(error);
        }

        if (!user) {
          res.status(401).json({ message: info.message });
        } else {
            req.user = user
            return next();
        }
      }
    )(req, res, next);
  }
}
