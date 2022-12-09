import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {IssueType, IssueTypeIcon} from '@tan2k/shared/models';
import {ProjectConst} from '@tan2k/shared/config/const';
import {IssueUtil} from '@tan2k/shared/config/issue';

@Component({
  selector: 'app-issue-type-select',
  templateUrl: './issue-type-select.component.html',
  styleUrls: ['./issue-type-select.component.scss']
})
export class IssueTypeSelectComponent implements OnInit {

    @Input() control: FormControl;

    issueTypes: IssueTypeIcon[];

    constructor() {
        this.issueTypes = ProjectConst.IssueTypesWithIcon;
    }

    ngOnInit(): void {}

    getIssueTypeIcon(issueType: IssueType) {
        return IssueUtil.getIssueTypeIcon(issueType);
    }

}
