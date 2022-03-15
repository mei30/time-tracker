import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { IVerifyOptions } from "passport-local";

import "../authservice/passportHandeler";
import { UserDocument } from "../models/user";
import { IRequest } from "../interfaces/request";

export class AuthController {
  authenticateJwt(req: IRequest, res: Response, next: NextFunction) {
    passport.authenticate(
      "jwt",
      (error: Error, user: UserDocument, info: IVerifyOptions) => {
        if (error) {
          return next(error);
        }

        if (!user) {
          res.status(401).json({ message: info.message });
        } else {
            req.userId = user.id
            return next();
        }
      }
    )(req, res, next);
  }
}
