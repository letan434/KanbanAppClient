import { ProjectState, ProjectStore } from './project.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { filter, map, delay } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import {Issue, StatusModel} from '@tan2k/shared/models';
@Injectable({
    providedIn: 'root'
})
export class ProjectQuery extends Query<ProjectState> {
    constructor(protected store: ProjectStore) {
        super(store);
    }
    isLoading$ = this.selectLoading();
    all$ = this.select();
    issues$ = this.select('issues');
    users$ = this.select('users');
    statuses$ = this.select('statuses');

    lastIssuePosition = (status: StatusModel): number => {
        const raw = this.store.getValue();
        const issuesByStatus = raw.issues.filter(x => x.status === status);
        return issuesByStatus.length;
    }

    issueByStatusSorted$ = (status: StatusModel): Observable<Issue[]> => this.issues$.pipe(
        map((issues) => issues
            .filter((x) => x.status.id === status.id)
            .sort((a, b) => a.listPosition - b.listPosition))
      )

    issueById$(issueId: string) {
        return this.issues$.pipe(
          delay(500),
          map((issues) => issues.find(x => x.id === issueId))
        );
      }
    nameProject() {
      const raw = this.store.getValue();
      return raw?.name;
    }

}
