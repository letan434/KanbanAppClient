import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Issue, User} from '@tan2k/shared/models';
import {ProjectsService} from '@tan2k/shared/services/projects.service';
import {UntilDestroy} from '@ngneat/until-destroy';

@Component({
  selector: 'app-issue-assignees',
  templateUrl: './issue-assignees.component.html',
  styleUrls: ['./issue-assignees.component.scss']
})
@UntilDestroy()
export class IssueAssigneesComponent implements OnInit, OnChanges {
    @Input() issue: Issue;
    @Input() users: User[];
    assignees: User[];

    constructor(private _projectService: ProjectsService) {}

    ngOnInit(): void {
        this.assignees = this.issue.userIds.map((userId) => this.users.find((x) => x.id === userId));
    }

    ngOnChanges(changes: SimpleChanges) {
        let issueChange = changes.issue;
        if (this.users && issueChange.currentValue !== issueChange.previousValue) {
            this.assignees = this.issue.userIds.map((userId) => this.users.find((x) => x.id === userId));
        }
    }

    removeUser(userId: string) {
        let newUserIds = this.issue.userIds.filter((x) => x !== userId);
        this._projectService.updateIssueAssignees({
            ...this.issue,
            userIds: newUserIds
        });
    }

    addUserToIssue(user: User) {
        this._projectService.updateIssueAssignees({
            ...this.issue,
            userIds: [...this.issue.userIds, user.id]
        });
    }

    isUserSelected(user: User): boolean {
        return this.issue.userIds.includes(user.id);
    }
}

