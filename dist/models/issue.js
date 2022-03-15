"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Issue = exports.IssueStatus = exports.IssueType = exports.TaskPriority = void 0;
const mongoose_1 = require("mongoose");
var TaskPriority;
(function (TaskPriority) {
    TaskPriority["HIGHT"] = "HIGHT";
    TaskPriority["MEDIUM"] = "MEDIUM";
    TaskPriority["LOW"] = "LOW";
})(TaskPriority = exports.TaskPriority || (exports.TaskPriority = {}));
var IssueType;
(function (IssueType) {
    IssueType["PROBLEM"] = "PROBLEM";
    IssueType["FEATURE"] = "FEATURE";
    IssueType["INCIDENT"] = "INCIDENT";
    IssueType["SUPPORT"] = "SUPPORT";
    IssueType["RESEARCH"] = "RESEARCH";
})(IssueType = exports.IssueType || (exports.IssueType = {}));
var IssueStatus;
(function (IssueStatus) {
    IssueStatus["NEW"] = "NEW";
    IssueStatus["IN_PROGRESS"] = "IN_PROGRESS";
    IssueStatus["SUSPENDED"] = "SUSPENDED";
    IssueStatus["DONE"] = "DONE";
})(IssueStatus = exports.IssueStatus || (exports.IssueStatus = {}));
const IssueSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        enum: Object.values(TaskPriority),
        default: TaskPriority.LOW,
        required: true,
    },
    issueType: {
        type: String,
        enum: Object.values(IssueType),
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(IssueStatus),
        default: IssueStatus.NEW,
        required: true,
    },
    estimatedTime: {
        type: Number,
        require: true,
    },
    consumedTime: {
        type: Number,
        required: true,
    },
    creator: {
        type: mongoose_1.Types.ObjectId,
        ref: "user",
        required: true
    },
}, { timestamps: true });
exports.Issue = (0, mongoose_1.model)("issue", IssueSchema);
