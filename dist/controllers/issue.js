"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IssueController = void 0;
const issue_1 = require("../models/issue");
class IssueController {
    getIssues(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            res.status(200).json({ message: [] });
        });
    }
    createIssue(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const issueData = req.body;
            const issue = yield issue_1.Issue.create({
                title: issueData.title,
                description: issueData.description,
                priority: issue_1.TaskPriority[issueData.priority],
                issueType: issue_1.IssueType[issueData.issueType],
                status: issue_1.IssueStatus[issueData.status],
                estimatedTime: issueData.estimatedTime,
                consumedTime: issueData.consumedTime,
                creator: req.userId,
            });
            res.status(200).json({ message: "Issue has been creted", issue: issue });
        });
    }
}
exports.IssueController = IssueController;
