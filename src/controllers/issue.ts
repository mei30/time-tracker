import { RequestHandler, Request, Response, NextFunction } from "express";

export class IssueController {
  getIssues: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    res.status(200).json({ message: [] });
  };
}
