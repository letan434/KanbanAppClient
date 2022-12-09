import { User } from "./user.model";

export class Comment {
  id: string;
  body: string;
  issueId: string;
  userId: string;
  user: User;
  createDate: string;
  lastModifiedDate: string;
  constructor(issueId: string, user: User) {
    const now = new Date();
    this.id = `${now.getTime()}`;
    this.issueId = issueId;
    this.user = user;
    this.createDate = now.toISOString();
    this.lastModifiedDate = now.toISOString();
  }
}
