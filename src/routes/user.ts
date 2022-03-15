import { Router } from "express";
import { UserController } from "../controllers/user";

export class UserRoutes {
  public router: Router;

  private readonly userController: UserController = new UserController();

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router.get("/signup", this.userController.getSignup);
    this.router.get("/login", this.userController.getLogin);
    this.router.post("/signup", this.userController.postSignup);
    this.router.post("/login", this.userController.postLogin);
  }
}
