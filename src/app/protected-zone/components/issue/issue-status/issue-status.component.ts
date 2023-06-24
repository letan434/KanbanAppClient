import {Component, Input, OnInit} from '@angular/core';
import {Issue, StatusModel} from '@tan2k/shared/models';
import {ProjectsService} from '@tan2k/shared/services/projects.service';
import {ProjectQuery} from '@tan2k/shared/state/project.query';

@Component({
  selector: 'app-issue-status',
  templateUrl: './issue-status.component.html',
  styleUrls: ['./issue-status.component.scss']
})
export class IssueStatusComponent implements OnInit {

    @Input() issue: Issue;
    issueStatuses: StatusModel[];
    public projectId: string;
    constructor(private _projectService: ProjectsService, private _projectQuery: ProjectQuery) {}

    ngOnInit(): void {
        this._projectQuery.statuses$.subscribe(
            (values) => {
                if(!this.issue.status.noDisabled){
                    this.issueStatuses = [];
                }else{
                    this.issueStatuses = values.filter(x=>x.noDisabled);
                }
            }
        );

    }
    updateIssue(status1: StatusModel) {
        if(!status1.noDisabled) return;
        const newPosition = this._projectQuery.lastIssuePosition(status1);
        this._projectService.updateIssueStatus({
            ...this.issue,
            status: status1,
            listPosition: newPosition + 1
        });
    }

    isStatusSelected(status: StatusModel) {
        return this.issue.status === status;
    }
}
