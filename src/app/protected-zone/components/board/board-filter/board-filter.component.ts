import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {ProjectQuery} from '@tan2k/shared/state/project.query';
import {FilterQuery} from '@tan2k/shared/state/filter/filter.query';
import {FilterService} from '@tan2k/shared/state/filter/filter.service';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {User} from '@tan2k/shared/models';

@Component({
  selector: 'app-board-filter',
  templateUrl: './board-filter.component.html',
  styleUrls: ['./board-filter.component.scss']
})
@UntilDestroy()
export class BoardFilterComponent implements OnInit {
    searchControl: FormControl = new FormControl('');
    userIds: string[];

    constructor(
        public projectQuery: ProjectQuery,
        public filterQuery: FilterQuery,
        public filterService: FilterService
    ) {
        this.userIds = [];
    }

    ngOnInit(): void {
        this.searchControl.valueChanges
            .pipe(debounceTime(100), distinctUntilChanged(), untilDestroyed(this))
            .subscribe((term) => {
                this.filterService.updateSearchTerm(term);
            });

        this.filterQuery.userIds$.pipe(untilDestroyed(this)).subscribe((userIds) => {
            this.userIds = userIds;
        });
    }

    isUserSelected(user: User) {
        return this.userIds.includes(user.id);
    }

    ignoreResolvedChanged() {
        this.filterService.toggleIgnoreResolve();
    }

    onlyMyIssueChanged() {
        this.filterService.toggleOnlyMyIssue();
    }

    userChanged(user: User) {
        this.filterService.toggleUserId(user.id);
    }

    resetAll() {
        this.searchControl.setValue('');
        this.filterService.resetAll();
    }
}
