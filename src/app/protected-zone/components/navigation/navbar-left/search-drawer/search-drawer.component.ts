import { Component, OnInit } from '@angular/core';
import {Issue} from '@tan2k/shared/models';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {debounceTime, map, startWith, switchMap} from 'rxjs/operators';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';

import { NzModalService
 } from 'ng-zorro-antd/modal';
import {Observable, of, combineLatest} from 'rxjs';
import {FormControl} from '@angular/forms';
import {IssueUtil} from '@tan2k/shared/config/issue';
import {IssueModalComponent} from '@tan2k/protected-zone/components/issue/issue-modal/issue-modal.component';
import {ProjectQuery} from '@tan2k/shared/state/project.query';

@Component({
  selector: 'app-search-drawer',
  templateUrl: './search-drawer.component.html',
  styleUrls: ['./search-drawer.component.scss']
})
@UntilDestroy()
export class SearchDrawerComponent implements OnInit {
    searchControl: FormControl = new FormControl('');
    results$: Observable<Issue[]>;
    recentIssues$: Observable<Issue[]>;

    get hasSearchTermInput(): boolean {
        return !!this.searchControl.value;
    }

    constructor(
        private _drawer: NzDrawerRef,
        private _modalService: NzModalService
 ,
        private _projectQuery: ProjectQuery
    ) {}
    public projectCurrentId;
    ngOnInit(): void {
        let search$ = this.searchControl.valueChanges.pipe(debounceTime(50), startWith(this.searchControl.value));
        this.recentIssues$ = this._projectQuery.issues$.pipe(map((issues) => issues.slice(0, 5)));
        this.results$ = combineLatest([search$, this._projectQuery.issues$]).pipe(
            untilDestroyed(this),
            switchMap(([term, issues]) => {
                let matchIssues = issues.filter((issue) => {
                    let foundInTitle = IssueUtil.searchString(issue.title, term);
                    let foundInDescription = IssueUtil.searchString(issue.description, term);
                    return foundInTitle || foundInDescription;
                });
                return of(matchIssues);
            })
        );
    }

    closeDrawer() {
        this._drawer.close();
    }

    openIssueModal(issue: Issue) {
        this._modalService.create({
            nzContent: IssueModalComponent,
            nzWidth: 1040,
            nzClosable: false,
            nzFooter: null,
            nzComponentParams: {
                issue$: this._projectQuery.issueById$(issue.id)
            }
        });
        this.closeDrawer();
    }
}
