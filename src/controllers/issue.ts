import { RequestHandler, Request, Response, NextFunction } from "express";

import {
  IssueDocument,
  Issue,
  IIssue,
  TaskPriority,
  IssueStatus,
  IssueType,
} from "../models/issue";
import { IRequest } from "../interfaces/request";

export class IssueController {
  public async getIssues(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    res.status(200).json({ message: [] });
  }

  public async createIssue(
    req: IRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const issueData: IIssue = req.body as IIssue;

    const issue: IssueDocument = await Issue.create({
      title: issueData.title,
      description: issueData.description,
      priority: TaskPriority[issueData.priority],
      issueType: IssueType[issueData.issueType],
      status: IssueStatus[issueData.status],
      estimatedTime: issueData.estimatedTime,
      consumedTime: issueData.consumedTime,
      creator: req.userId,
    });

    res.status(200).json({ message: "Issue has been creted", issue: issue });
  }
}
