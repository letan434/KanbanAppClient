import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Issue, IssuePriority, IssueType, StatusModel, User } from '@tan2k/shared/models';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { quillConfiguration } from '@tan2k/shared/config/editor';
import { delay, tap } from 'rxjs/operators';
import { NoWhitespaceValidator } from '@tan2k/shared/config/no-whitespace.validator';
import { IssueUtil } from '@tan2k/shared/config/issue';
import { DateUtil } from '@tan2k/shared/config/date';
import { ProjectQuery } from '@tan2k/shared/state/project.query';
import { DatePipe } from '@angular/common';
import { MessageConstants } from '@tan2k/shared/constants';
import { NotificationService, ProjectsService } from '@tan2k/shared/services';

@Component({
    selector: 'app-add-issue-modal',
    templateUrl: './add-issue-modal.component.html',
    styleUrls: ['./add-issue-modal.component.scss']
})
@UntilDestroy()
export class AddIssueModalComponent implements OnInit, OnDestroy {

    reporterUsers$: Observable<User[]>;
    assignees$: Observable<User[]>;
    public issueForm: FormGroup;
    editorOptions = quillConfiguration;
    saved: EventEmitter<any> = new EventEmitter();
    public projectId = localStorage.getItem('projectCurrentId');
    public blockedPanel = false;
    public btnDisabled = false;
    public subscription = new Subscription();
    status$: Observable<StatusModel[]>;
    statusVm: StatusModel;
    get f() {
        return this.issueForm?.controls;
    }

    constructor(
        private _fb: FormBuilder,
        private _modalRef: NzModalRef,
        private _projectsService: ProjectsService,
        public _projectQuery: ProjectQuery,
        private notificationService: NotificationService,
        private datePipe: DatePipe

    ) { }

    ngOnInit(): void {
        this.initForm();
        this.reporterUsers$ = this._projectQuery.users$.pipe(
            untilDestroyed(this),
            tap((users) => {
                let [user] = users;
                console.log(users);
                if (user) {
                    this.f.reporterId.patchValue(user.id);
                    console.log(this.f.reporterId.patchValue(user.id));
                }
            })
        );
        this._projectQuery.statuses$.subscribe(
            (statuses) => {
                console.log(statuses);
                this.statusVm = statuses[0];
            });
        this.assignees$ = this._projectQuery.users$;
        console.log(this._projectQuery.users$);
    }


    initForm() {
        this.issueForm = this._fb.group({
            sample: [IssueType.TASK],
            priority: [IssuePriority.MEDIUM],
            title: ['', NoWhitespaceValidator()],
            description: [''],
            reporterId: [''],
            userIds: [[]]
        });
    }

    submitForm() {
        if (this.issueForm.invalid) {
            return;
        }
        //let now = DateUtil.getNow();
        let issue: Issue = {
            ...this.issueForm.getRawValue(),
            id: IssueUtil.getRandomId(),
            status: this.statusVm,
            //createDate: now,
            projectId: this.projectId
        };
        this._projectsService.add1(issue).subscribe(
            (value) => {
                console.log(value);
                this.closeModal();
                this._projectsService.createIssue(issue);
                this.notificationService.showSuccess(MessageConstants.CREATED_OK_MSG);
                this.saved.emit(this.issueForm.value);
            },
            error => {
                this.notificationService.showError(error);
            }
        );
    }

    cancel() {
        this.closeModal();
    }

    closeModal() {
        this._modalRef.close();
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
