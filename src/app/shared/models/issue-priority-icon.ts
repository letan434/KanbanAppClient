import {IssuePriority, IssuePriorityColors} from '@tan2k/shared/models/issue.model';

export class IssuePriorityIcon {
    icon: string;
    value: string;
    color: string;

    constructor(issuePriority: IssuePriority) {
        let lowerPriorities = [IssuePriority.LOW, IssuePriority.LOWEST];
        this.value = issuePriority;
        this.icon = lowerPriorities.includes(issuePriority) ? 'arrow-down' : 'arrow-up';
        this.color = IssuePriorityColors[issuePriority];
    }
}
