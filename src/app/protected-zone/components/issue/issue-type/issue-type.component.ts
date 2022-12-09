import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Issue, IssueType, IssueTypeIcon} from '@tan2k/shared/models';
import {IssueUtil} from '@tan2k/shared/config/issue';
import {ProjectConst} from '@tan2k/shared/config/const';
import {ProjectsService} from '@tan2k/shared/services/projects.service';
import {IssuesService} from '@tan2k/shared/services';
import {sample} from 'rxjs/operators';

@Component({
  selector: 'app-issue-type',
  templateUrl: './issue-type.component.html',
  styleUrls: ['./issue-type.component.scss']
})
export class IssueTypeComponent implements OnInit, OnChanges {

    @Input() issue: Issue;

    get selectedIssueTypeIcon(): string {
        return IssueUtil.getIssueTypeIcon(this.issue.sample);
    }

    issueTypes: IssueTypeIcon[];

    constructor(private projectService: ProjectsService) {
        this.issueTypes = ProjectConst.IssueTypesWithIcon;
    }

    ngOnInit() {}

    ngOnChanges(): void {}

    updateIssue(issueType: IssueType) {
        this.projectService.updateIssueType({
          ...this.issue,
          sample: issueType
        });
      }

    isTypeSelected(type: IssueType) {
        return this.issue.sample === type;
    }
}
