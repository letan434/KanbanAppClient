import { Component, OnInit, EventEmitter } from '@angular/core';
import {DeleteIssueModel} from '@tan2k/shared/config/delete-issue-model';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-issue-delete-modal',
  templateUrl: './issue-delete-modal.component.html',
  styleUrls: ['./issue-delete-modal.component.scss']
})
export class IssueDeleteModalComponent implements OnInit {

    issueId: string;

    onDelete = new EventEmitter<DeleteIssueModel>();

    constructor(private _modalRef: NzModalRef) {}

    ngOnInit(): void {}

    deleteIssue() {
        this.onDelete.emit(new DeleteIssueModel(this.issueId, this._modalRef));
    }

    closeModal() {
        this._modalRef.close();
    }

}
