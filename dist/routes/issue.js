"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IssueRoutes = void 0;
const express_1 = require("express");
const issue_1 = require("../controllers/issue");
const authentication_1 = require("../controllers/authentication");
class IssueRoutes {
    constructor() {
        this.issueController = new issue_1.IssueController();
        this.authController = new authentication_1.AuthController();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/all", this.authController.authenticateJwt, this.issueController.getIssues);
    }
}
exports.IssueRoutes = IssueRoutes;
