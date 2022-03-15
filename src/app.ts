import express from "express";
import { json } from "body-parser";
import { connect } from "mongoose";

import { UserRoutes } from "./routes/user";
import { IssueRoutes } from "./routes/issue";

const DATABASE_URI = "mongodb://127.0.0.1:27017/timetracker";

const timeTrackerApp = express();

timeTrackerApp.use(json());

timeTrackerApp.use("/user", new UserRoutes().router);
timeTrackerApp.use("/issue", new IssueRoutes().router);

connect(DATABASE_URI)
  .then(() => {
    timeTrackerApp.listen(5000);
  })
  .catch((error) => {
    console.log(error);
  });
