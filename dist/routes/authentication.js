"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationRoutes = void 0;
const express_1 = require("express");
class AuthenticationRoutes {
    constructor() {
        this.authController = new this.AuthController();
        this.router = (0, express_1.Router)();
        this.setRoutes();
    }
    setRoutes() {
        this.router.get("/signup", this.authController.getSignup);
        this.router.post("/signup", this.authController.postSignup);
        this.router.get("/login", this.authController.getLogin);
        this.router.post("/login", this.authController.postLogin);
    }
}
exports.AuthenticationRoutes = AuthenticationRoutes;
