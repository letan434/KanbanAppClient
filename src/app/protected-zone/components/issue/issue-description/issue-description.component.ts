import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Issue } from '@tan2k/shared/models';
import { FormControl } from '@angular/forms';
import { quillConfiguration } from '@tan2k/shared/config/editor';
import { ProjectsService } from '@tan2k/shared/services/projects.service';

@Component({
    selector: 'app-issue-description',
    templateUrl: './issue-description.component.html',
    styleUrls: ['./issue-description.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class IssueDescriptionComponent implements OnChanges {

    @Input() issue: Issue;
    descriptionControl: FormControl;
    editorOptions = quillConfiguration;
    isEditing: boolean;
    isWorking: boolean;

    constructor(private _projectService: ProjectsService) { }

    ngOnChanges(changes: SimpleChanges): void {
        const issueChange = changes.issue;
        if (issueChange.currentValue !== issueChange.previousValue) {
            this.descriptionControl = new FormControl(this.issue.description);
        }
    }

    setEditMode(mode: boolean) {
        this.isEditing = mode;
    }

    editorCreated(editor: any) {
        // tslint:disable-next-line:no-unused-expression
        if (editor && editor.focus) {
            editor.focus();
        }
    }

    save() {
        this._projectService.updateIssueDescription({
            ...this.issue,
            description: this.descriptionControl.value
        });
        this.setEditMode(false);
    }

    cancel() {
        this.descriptionControl.patchValue(this.issue.description);
        this.setEditMode(false);
    }


}
