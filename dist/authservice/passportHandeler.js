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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passportLocal = __importStar(require("passport-local"));
const passportJwt = __importStar(require("passport-jwt"));
const user_1 = require("../models/user");
const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const Extratjwt = passportJwt.ExtractJwt;
passport_1.default.use(new LocalStrategy((username, password, done) => {
    user_1.User.findOne({ username: username.toLowerCase() }, (error, user) => {
        if (error) {
            return done(error, false);
        }
        if (!user) {
            return done(undefined, false, {
                message: `Username ${username} not found`,
            });
        }
        user.comparePassword(password, (error, same) => {
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
    });
}));
passport_1.default.use(new JwtStrategy({
    secretOrKey: "supersecret",
    jwtFromRequest: Extratjwt.fromAuthHeaderAsBearerToken(),
}, (jwtPayload, done) => {
    user_1.User.findById(jwtPayload.sub, (error, user) => {
        if (error) {
            return done(error, false, { message: 'error' });
        }
        if (user) {
            return done(undefined, user, { message: 'user found' });
        }
        else {
            return done(undefined, false, { message: 'user does not exist' });
        }
    });
}));
