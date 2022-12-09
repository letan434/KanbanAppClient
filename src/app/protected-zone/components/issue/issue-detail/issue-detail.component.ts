import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Issue} from '@tan2k/shared/models';
import {DeleteIssueModel} from '@tan2k/shared/config/delete-issue-model';
import {NzModalService} from 'ng-zorro-antd/modal';
import {IssueDeleteModalComponent} from '@tan2k/protected-zone/components/issue/issue-delete-modal/issue-delete-modal.component';
import {ProjectQuery} from '@tan2k/shared/state/project.query';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.scss']
})
export class IssueDetailComponent implements OnInit {

    @Input() issue: Issue;
    @Input() isShowFullScreenButton: boolean;
    @Input() isShowCloseButton: boolean;
    @Output() onClosed = new EventEmitter();
    @Output() onOpenIssue = new EventEmitter<string>();
    @Output() onDelete = new EventEmitter<DeleteIssueModel>();

    constructor( public projectQuery: ProjectQuery, private _modalService: NzModalService) {}

    ngOnInit(): void {}

    openDeleteIssueModal() {
        this._modalService.create({
            nzContent: IssueDeleteModalComponent,
            nzClosable: false,
            nzFooter: null,
            nzStyle: {
                top: '140px'
            },
            nzComponentParams: {
                issueId: this.issue.id,
                onDelete: this.onDelete
            }
        });
    }

    closeModal() {
        this.onClosed.emit();
    }

    openIssuePage() {
      this.onOpenIssue.emit(this.issue.id);
    }
}
