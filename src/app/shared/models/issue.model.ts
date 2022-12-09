import {Comment} from '@tan2k/shared/models';
import {StatusModel} from '@tan2k/shared/models';
import { Attachments } from '@tan2k/shared/models';

export interface Issue {
    id: string;
    title: string;
    sample: IssueType;
    status: StatusModel;
    priority: IssuePriority;
    listPosition: number;
    description: string;
    estimate: number;
    timeSpent: number;
    timeRemaining: number;
    createDate: string;
    lastModifiedDate: string;
    reporterId: string;
    userIds: string[];
    comments: Comment[];
    projectId: string;
    startDate: Date;
    endDate: Date;
    attachments: Attachments[];
}
export enum IssueType {
    STORY = 'STORY',
    TASK = 'TASK',
    BUG = 'BUG'
}

// export enum IssueStatus {
//     BACKLOG = 'Backlog',
//     SELECTED = 'Selected',
//     IN_PROGRESS = 'InProgress',
//     DONE = 'Done'
// }
//
// export const IssueStatusDisplay = {
//     [IssueStatus.BACKLOG]: 'Backlog',
//     [IssueStatus.SELECTED]: 'Selected for Development',
//     [IssueStatus.IN_PROGRESS]: 'In progress',
//     [IssueStatus.DONE]: 'Done'
// };

export enum IssuePriority {
    LOWEST = 'Lowest',
    LOW = 'Low',
    MEDIUM = 'Medium',
    HIGH = 'High',
    HIGHEST = 'Highest'
}
export const IssuePriorityColors = {
    [IssuePriority.HIGHEST]: '#CD1317',
    [IssuePriority.HIGH]: '#E9494A',
    [IssuePriority.MEDIUM]: '#E97F33',
    [IssuePriority.LOW]: '#2D8738',
    [IssuePriority.LOWEST]: '#57A55A'
};
