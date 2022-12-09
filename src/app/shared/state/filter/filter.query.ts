import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import {FilterState, FilterStore} from '@tan2k/shared/state/filter/filter.store';

@Injectable({ providedIn: 'root' })
export class FilterQuery extends Query<FilterState> {
    constructor(protected store: FilterStore) {
        super(store);
    }

    any$ = this.select(({ searchTerm, userIds, onlyMyIssue, ignoreResolved }) => {
        return !!searchTerm || !!userIds?.length || onlyMyIssue || ignoreResolved;
    });
    all$ = this.select();
    userIds$ = this.select('userIds');
    onlyMyIssue$ = this.select('onlyMyIssue');
    ignoreResolve$ = this.select('ignoreResolved');
}
