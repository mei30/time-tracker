import { Schema, Document, model, Types } from "mongoose";

export enum TaskPriority {
  HIGHT = 'HIGHT',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

export enum IssueType {
  PROBLEM = 'PROBLEM',
  FEATURE = 'FEATURE',
  INCIDENT = 'INCIDENT',
  SUPPORT = 'SUPPORT',
  RESEARCH = 'RESEARCH',
}

export enum IssueStatus {
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  SUSPENDED = 'SUSPENDED',
  DONE = 'DONE',
}

export interface IIssue {
  title: string;
  description: string;
  priority: TaskPriority;
  issueType: IssueType;
  status: IssueStatus;
  estimatedTime: number;
  consumedTime: number;
}

export interface IssueDocument extends IIssue, Document {}

const IssueSchema = new Schema(
  {
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
      type: Types.ObjectId,
      ref: "user",
      required: true
    },
  },

  { timestamps: true }
);

export const Issue = model<IssueDocument>("issue", IssueSchema);
