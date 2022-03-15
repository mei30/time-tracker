"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const user_1 = require("../models/user");
require("../authservice/passportHandeler");
const passport_1 = __importDefault(require("passport"));
class UserController {
    constructor() {
        this.getSignup = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            // TODO: Get signup page using svelte
            res.status(200).json({ message: "Signup page" });
        });
        this.postSignup = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            // check existence of user and if user already exist return error
            const existingUser = yield user_1.User.findOne({ username: username });
            if (existingUser) {
                return res.status(409).json({ message: "User already exist" });
            }
            const user = new user_1.User({ username, password });
            yield user.save();
            res
                .status(201)
                .json({ message: "User already has been created", UserId: user._id });
        });
        this.getLogin = (req, res, next) => {
            // TODO: Get login page using svelte
            res.status(200).json({ message: "Login page" });
        };
        this.postLogin = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            passport_1.default.authenticate("local", (error, user, info) => {
                if (error) {
                    return next(error);
                }
                if (!user) {
                    res.status(401).json({ message: info.message });
                }
                else {
                    // jwt token
                    const jwtPayload = { sub: user._id.toString() };
                    // TODO: Secret and token expireation time should be configurable.
                    const token = jwt.sign(jwtPayload, "supersecret", {
                        expiresIn: "1h",
                    });
                    res.status(200).json({ token: token });
                }
            })(req, res, next);
        });
    }
}
exports.UserController = UserController;
