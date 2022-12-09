import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {Issue, IssuePriorityIcon, User} from '@tan2k/shared/models';
import {ProjectQuery} from '@tan2k/shared/state/project.query';
import {NzModalService} from 'ng-zorro-antd/modal';
import {IssueUtil} from '@tan2k/shared/config/issue';
import {IssueModalComponent} from '@tan2k/protected-zone/components/issue/issue-modal/issue-modal.component';

@Component({
  selector: 'app-issue-card',
  templateUrl: './issue-card.component.html',
  styleUrls: ['./issue-card.component.scss']
})
@UntilDestroy()
export class IssueCardComponent implements OnInit, OnChanges {
    @Input() issue: Issue;
    assignees: User[];
    issueTypeIcon: string;
    priorityIcon: IssuePriorityIcon;

    constructor(private _projectQuery: ProjectQuery, private _modalService: NzModalService) {}

    ngOnInit(): void {
        this._projectQuery.users$.pipe(untilDestroyed(this)).subscribe((users) => {
            this.assignees = this.issue.userIds.map((userId) => users.find((x) => x.id === userId));
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        let issueChange = changes.issue;
        if (issueChange?.currentValue !== issueChange.previousValue) {
            this.issueTypeIcon = IssueUtil.getIssueTypeIcon(this.issue.sample);
            this.priorityIcon = IssueUtil.getIssuePriorityIcon(this.issue.priority);
        }
    }

    openIssueModal(issueId: string) {
        this._modalService.create({
            nzContent: IssueModalComponent,
            nzWidth: 1040,
            nzClosable: false,
            nzFooter: null,
            nzComponentParams: {
                issue$: this._projectQuery.issueById$(issueId)
            }
        });
    }
}
