import { Router } from "express";
import { IssueController } from "../controllers/issue";
import { AuthController } from "../controllers/authentication";

export class IssueRoutes {
  public router: Router;

  private readonly issueController: IssueController = new IssueController();
  private readonly authController: AuthController = new AuthController();

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router.get(
      "/all",
      this.authController.authenticateJwt,
      this.issueController.getIssues
    );

    this.router.post(
      "/",
      this.authController.authenticateJwt,
      this.issueController.createIssue
    );
  }
}
