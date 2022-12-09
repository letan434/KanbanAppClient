import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {ProjectConst} from '@tan2k/shared/config/const';
import {ProjectQuery} from '@tan2k/shared/state/project.query';
import {Observable} from 'rxjs';
import {DeleteIssueModel} from '@tan2k/shared/config/delete-issue-model';
import {Issue, Project} from '@tan2k/shared/models';
import {ProjectsService} from '@tan2k/shared/services';

@Component({
  selector: 'app-full-issue-detail',
  templateUrl: './full-issue-detail.component.html',
  styleUrls: ['./full-issue-detail.component.scss']
})
@UntilDestroy()
export class FullIssueDetailComponent implements OnInit {
    project: Project;
    issueById$: Observable<Issue>;
    issueId: string;
    get breadcrumbs(): string[] {
        return [ProjectConst.Projects, this.project?.name, 'Issues', this.issueId];
    }

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _projectQuery: ProjectQuery,
        private _projectService: ProjectsService
    ) {
    }

    ngOnInit(): void {
        this._projectService.getDetail(localStorage.getItem('projectCurrentId'));
        this.getIssue();
        this._projectQuery.all$.pipe(untilDestroyed(this)).subscribe((project) => {
            this.project = project;
        });
    }

    private getIssue() {
        this.issueId = this._route.snapshot.paramMap.get(ProjectConst.IssueId);
        if (!this.issueId) {
            this.backHome();
            return;
        }
        this.issueById$ = this._projectQuery.issueById$(this.issueId);
    }

    deleteIssue({issueId, deleteModalRef}: DeleteIssueModel) {
        this._projectService.deleteIssue(issueId);
        deleteModalRef.close();
        this.backHome();
    }

    private backHome() {
        this._router.navigate(['/']);
    }
}

