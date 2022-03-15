"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const user_1 = require("../controllers/user");
class UserRoutes {
    constructor() {
        this.userController = new user_1.UserController();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/signup", this.userController.getSignup);
        this.router.get("/login", this.userController.getLogin);
        this.router.post("/signup", this.userController.postSignup);
        this.router.post("/login", this.userController.postLogin);
    }
}
exports.UserRoutes = UserRoutes;
