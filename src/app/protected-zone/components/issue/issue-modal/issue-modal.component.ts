import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Issue} from '@tan2k/shared/models';
import { NzModalRef } from 'ng-zorro-antd/modal';

import {Router} from '@angular/router';
import {DeleteIssueModel} from '@tan2k/shared/config/delete-issue-model';
import {IssuesService} from '@tan2k/shared/services';

@Component({
  selector: 'app-issue-modal',
  templateUrl: './issue-modal.component.html',
  styleUrls: ['./issue-modal.component.scss']
})
export class IssueModalComponent implements OnInit {

    @Input() issue$: Observable<Issue>;

    constructor(
        private _modal: NzModalRef,
        private _router: Router,
        private issuesService: IssuesService
    ) {}

    ngOnInit(): void {}

    closeModal() {
        this._modal.close();
    }

    openIssuePage(issueId: string) {
        this.closeModal();
        this._router.navigate(['project', 'issue', issueId]);
    }

    deleteIssue({ issueId, deleteModalRef }: DeleteIssueModel) {
        this.issuesService.delete(issueId);
        deleteModalRef.close();
        this.closeModal();
    }

}
