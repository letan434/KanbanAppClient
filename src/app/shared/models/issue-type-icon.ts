import {IssueType} from '@tan2k/shared/models/issue.model';
import {IssueUtil} from '@tan2k/shared/config/issue';

export class IssueTypeIcon {
    value: IssueType;
    icon: string;

    constructor(issueType: IssueType) {
        this.value = issueType;
        this.icon = IssueUtil.getIssueTypeIcon(issueType);
    }
}
