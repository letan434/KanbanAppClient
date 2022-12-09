import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {IssuePriority, IssuePriorityIcon} from '@tan2k/shared/models';
import {IssueUtil} from '@tan2k/shared/config/issue';
import {ProjectConst} from '@tan2k/shared/config/const';

@Component({
  selector: 'app-issue-priority-select',
  templateUrl: './issue-priority-select.component.html',
  styleUrls: ['./issue-priority-select.component.scss']
})
export class IssuePrioritySelectComponent implements OnInit {

    @Input() control: FormControl;
    priorities: IssuePriorityIcon[];

    constructor() {
        this.priorities = ProjectConst.PrioritiesWithIcon;
    }

    getPriorityIcon(priority: IssuePriority) {
        return IssueUtil.getIssuePriorityIcon(priority);
    }

    ngOnInit(): void {}

}
