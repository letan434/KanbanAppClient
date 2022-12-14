import { Injectable } from '@angular/core';
import {createInitialFilterState, FilterStore} from '@tan2k/shared/state/filter/filter.store';

@Injectable({
    providedIn: 'root'
})
export class FilterService {
    constructor(private store: FilterStore) {}

    updateSearchTerm(searchTerm: string) {
        this.store.update({
            searchTerm
        });
    }

    toggleUserId(userId: string) {
        this.store.update((state) => {
            let hasUser = state.userIds.includes(userId);
            let userIds = hasUser
                ? state.userIds.filter((x) => x !== userId)
                : [...state.userIds, userId];
            return {
                ...state,
                userIds
            };
        });
    }

    toggleOnlyMyIssue() {
        this.store.update((state) => {
            let onlyMyIssue = !state.onlyMyIssue;
            return {
                ...state,
                onlyMyIssue
            };
        });
    }

    toggleIgnoreResolve() {
        this.store.update((state) => {
            let ignoreResolved = !state.ignoreResolved;
            return {
                ...state,
                ignoreResolved
            };
        });
    }

    resetAll() {
        this.store.update((state) => ({
            ...state,
            ...createInitialFilterState()
        }));
    }
}
