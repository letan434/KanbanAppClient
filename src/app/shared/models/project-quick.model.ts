import {User} from '@tan2k/shared/models/user.model';
import {Issue} from '@tan2k/shared/models/issue.model';

export class ProjectQuick {
    id: string;
    categoryId: number;
    name: string;
    description: string;
    createDate: string;
    lastModifiedDate: string;
    users: User[];
    issues: Issue[];
    url: string;
}
