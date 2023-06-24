import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { IssueUtil } from '@tan2k/shared/config/issue';
import { combineLatest, Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Issue, StatusModel } from '@tan2k/shared/models';
import { ProjectsService } from '@tan2k/shared/services/projects.service';
import { FilterState } from '@tan2k/shared/state/filter/filter.store';
import { FilterQuery } from '@tan2k/shared/state/filter/filter.query';
import * as dateFns from 'date-fns';
import { ProjectQuery } from '@tan2k/shared/state/project.query';
import { ProjectStore } from '@tan2k/shared/state/project.store';
import { NotificationService } from '@tan2k/shared/services';
import { MessageConstants } from '@tan2k/shared/constants';
import { DateUtil } from '@tan2k/shared/config/date';
@Component({
    // tslint:disable-next-line:component-selector
    selector: '[app-board-dnd-list]',
    templateUrl: './board-dnd-list.component.html',
    styleUrls: ['./board-dnd-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
@UntilDestroy()

export class BoardDndListComponent implements OnInit {
    @Input() status: StatusModel;
    @Input() currentUserId: string;
    @Input() issues$: Observable<Issue[]>;
    issues: Issue[] = [];
    statuses: StatusModel[];
    get issuesCount(): number {
        return this.issues.length;
    }

    constructor(private _projectService: ProjectsService, private _filterQuery: FilterQuery, private _store: ProjectStore,
        private _projectQuery: ProjectQuery,  private notificationService: NotificationService,

        ) { }

    ngOnInit(): void {
        this._projectQuery.statuses$.subscribe(
            (values) => {
                this.statuses = values;
                console.log(values);

            }
        );
        combineLatest([this.issues$, this._filterQuery.all$])
            .pipe(untilDestroyed(this))
            .subscribe(([issues, filter]) => {
                this.issues = this.filterIssues(issues, filter);
            });
    }

    drop(event: CdkDragDrop<Issue[]>) {

        const newIssue: Issue = { ...event.item.data };
        const newIssues = [...event.container.data];
        if(!this.status.noDisabled) return;
        if (event.previousContainer === event.container) {
            newIssues.map((item, index)=>{
                if(item.id === newIssue.id){
                    newIssues[index].lastModifiedDate = DateUtil.getNow();
                }
            })
            moveItemInArray(newIssues, event.previousIndex, event.currentIndex);
            var result = this.updateListPosition(newIssues);
            this._projectService.updateIssuesStatus(result).subscribe(
                (value)=>{
                    if(value) this.notificationService.showSuccess(MessageConstants.UPDATED_OK_MSG);
                    else this._projectService.getDetail(localStorage.getItem('projectCurrentId'));
                },
                (error)=>{
                    this.notificationService.showError(MessageConstants.SYSTEM_ERROR_MSG);
                    this._projectService.getDetail(localStorage.getItem('projectCurrentId'));
                }
            );
        } else {
            transferArrayItem(
                event.previousContainer.data,
                newIssues,
                event.previousIndex,
                event.currentIndex
            );
            newIssue.listPosition = event.currentIndex +1;
            var result = this.updateListPosition1(event.previousContainer.data)
            newIssue.status = this.statuses.find(x => x.id === event.container.id as string);
            newIssue.lastModifiedDate = DateUtil.getNow();
            //this._projectService.updateIssueStatus(newIssue);
            var result1 = this.updateListPosition1([...event.container.data, ...result, newIssue])
            this._projectService.updateIssuesStatus(result1).subscribe(
                (value)=>{
                    if(value) this.notificationService.showSuccess(MessageConstants.UPDATED_OK_MSG);
                    else this._projectService.getDetail(localStorage.getItem('projectCurrentId'));
                },
                (error)=>{
                    this.notificationService.showError(MessageConstants.SYSTEM_ERROR_MSG);
                    this._projectService.getDetail(localStorage.getItem('projectCurrentId'));
                }
            );
        }
    }

    private updateListPosition(newList: Issue[]) {
        // newList.forEach((issue, idx) => {
        //     const newIssueWithNewPosition = { ...issue, listPosition: idx + 1};
        //     this._projectService.updateIssueStatus(newIssueWithNewPosition);
        // });
        var result: Issue[] = [];
        newList.forEach((issue, idx) => {
            result.push({ ...issue, listPosition: idx + 1});
        });
        return result;
    }
    private updateListPosition1(newList: Issue[]): Issue[] {
        newList.sort(function (a, b) {
            return a.listPosition - b.listPosition;
          });
        var result: Issue[] = [];
        newList.forEach((issue, idx) => {
            result.push({ ...issue, listPosition: idx + 1});
        });
        return result;
    }

    filterIssues(issues: Issue[], filter: FilterState): Issue[] {
        const { onlyMyIssue, ignoreResolved, searchTerm, userIds } = filter;
        return issues.filter((issue) => {
            const isMatchTerm = searchTerm
                ? IssueUtil.searchString(issue.title, searchTerm)
                : true;

            const isIncludeUsers = userIds.length
                ? issue.userIds.some((userId) => userIds.includes(userId))
                : true;

            const isMyIssue = onlyMyIssue
                ? this.currentUserId && issue.userIds.includes(this.currentUserId)
                : true;

            const isIgnoreResolved = ignoreResolved ? issue.status.name !== 'DONE' : true;

            return isMatchTerm && isIncludeUsers && isMyIssue && isIgnoreResolved;
        });
    }

    isDateWithinThreeDaysFromNow(date: string) {
        const now = new Date();
        const inputDate = new Date(date);
        return dateFns.isAfter(inputDate, dateFns.subDays(now, 3));
    }

}
