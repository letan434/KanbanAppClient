import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Issue, IssuePriority, IssuePriorityIcon} from '@tan2k/shared/models';
import {IssueUtil} from '@tan2k/shared/config/issue';
import {ProjectsService} from '@tan2k/shared/services/projects.service';
import {ProjectConst} from '@tan2k/shared/config/const';

@Component({
  selector: 'app-issue-priority',
  templateUrl: './issue-priority.component.html',
  styleUrls: ['./issue-priority.component.scss']
})
export class IssuePriorityComponent implements OnInit, OnChanges {

    selectedPriority: IssuePriority;

    get selectedPriorityIcon() {
        return IssueUtil.getIssuePriorityIcon(this.selectedPriority);
    }

    priorities: IssuePriorityIcon[];

    @Input() issue: Issue;

    constructor(private _projectService: ProjectsService) {}

    ngOnInit() {
        this.priorities = ProjectConst.PrioritiesWithIcon;
    }

    ngOnChanges(): void {
        this.selectedPriority = this.issue?.priority;
    }

    isPrioritySelected(priority: IssuePriority) {
        return priority === this.selectedPriority;
    }

    updateIssue(priority: IssuePriority) {
        this.selectedPriority = priority;
        this._projectService.updateIssuePriority({
            ...this.issue,
            priority: this.selectedPriority
        });
    }

}
