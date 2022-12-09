import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Issue} from '@tan2k/shared/models';
import {ProjectsService} from '@tan2k/shared/services/projects.service';

@Component({
  selector: 'app-issue-title',
  templateUrl: './issue-title.component.html',
  styleUrls: ['./issue-title.component.scss']
})
export class IssueTitleComponent implements OnChanges {

    @Input() issue: Issue;
    titleControl: FormControl;

    constructor(private _projectService: ProjectsService) {}

    ngOnChanges(changes: SimpleChanges): void {
        const issueChange = changes.issue;
        if (issueChange.currentValue !== issueChange.previousValue) {
            this.titleControl = new FormControl(this.issue.title);
        }
    }

    onBlur() {
        this._projectService.updateIssueTitle({
            ...this.issue,
            title: this.titleControl.value
        });
    }

}
