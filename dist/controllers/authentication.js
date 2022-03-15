"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const passport_1 = __importDefault(require("passport"));
require("../authservice/passportHandeler");
class AuthController {
    authenticateJwt(req, res, next) {
        passport_1.default.authenticate("jwt", (error, user, info) => {
            if (error) {
                return next(error);
            }
            if (!user) {
                res.status(401).json({ message: info.message });
            }
            else {
                req.userId = user.id;
                return next();
            }
        })(req, res, next);
    }
}
exports.AuthController = AuthController;
