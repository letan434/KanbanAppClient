import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Issue, User} from '@tan2k/shared/models';
import {ProjectsService} from '@tan2k/shared/services/projects.service';
import {UntilDestroy} from '@ngneat/until-destroy';

@Component({
  selector: 'app-issue-reporter',
  templateUrl: './issue-reporter.component.html',
  styleUrls: ['./issue-reporter.component.scss']
})
@UntilDestroy()
export class IssueReporterComponent implements OnInit, OnChanges {
    @Input() issue: Issue;
    @Input() users: User[];
    reporter: User;

    constructor(private _projectService: ProjectsService) {}

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges) {
        let issueChange = changes.issue;
        if (this.users && issueChange && issueChange.currentValue !== issueChange.previousValue) {
            this.reporter = this.users.find((x) => x.id === this.issue.reporterId);
        }
    }

    isUserSelected(user: User) {
        return user.id === this.issue.reporterId;
    }

    updateIssue(user: User) {
        this._projectService.updateIssueReporter({
            ...this.issue,
            reporterId: user.id
        });
    }
}
