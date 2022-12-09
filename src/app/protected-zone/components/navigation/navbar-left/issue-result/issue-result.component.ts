import {Component, Input, OnInit} from '@angular/core';
import {Issue} from '@tan2k/shared/models';
import {IssueUtil} from '@tan2k/shared/config/issue';

@Component({
  selector: 'app-issue-result',
  templateUrl: './issue-result.component.html',
  styleUrls: ['./issue-result.component.scss']
})
export class IssueResultComponent implements OnInit {

    @Input() issue: Issue;

    get issueTypeIcon() {
        return IssueUtil.getIssueTypeIcon(this.issue?.sample);
    }

    constructor() {}

    ngOnInit(): void {}

}
