"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const mongoose_1 = require("mongoose");
const user_1 = require("./routes/user");
const issue_1 = require("./routes/issue");
const DATABASE_URI = "mongodb://127.0.0.1:27017/timetracker";
const timeTrackerApp = (0, express_1.default)();
timeTrackerApp.use((0, body_parser_1.json)());
timeTrackerApp.use("/user", new user_1.UserRoutes().router);
timeTrackerApp.use("/issue", new issue_1.IssueRoutes().router);
(0, mongoose_1.connect)(DATABASE_URI)
    .then(() => {
    timeTrackerApp.listen(5000);
})
    .catch((error) => {
    console.log(error);
});
