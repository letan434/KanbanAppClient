import {Issue} from '@tan2k/shared/models/issue.model';
import {User} from '@tan2k/shared/models/user.model';
import {StatusModel} from '@tan2k/shared/models/status.model';

export class Project {
  id: string;
  name: string;
  categoryId: number;
  avatarUrl: string;
  description: string;
  ownerUserId: string;
  createDate: string;
  lastModifiedDate: string;
  issues: Issue[];
  users: User[];
  statuses: StatusModel[];
}
