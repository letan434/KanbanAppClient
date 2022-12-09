import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import {Project} from '@tan2k/shared/models';

// tslint:disable-next-line:no-empty-interface
export interface ProjectState extends Project {}

function createInitialState(): ProjectState {
    return {
        issues: [],
        users: [],
        statuses: []
    } as ProjectState;
}

@Injectable({
    providedIn: 'root'
})
@StoreConfig({
    name: 'project'
})
export class ProjectStore extends Store<ProjectState> {
    constructor() {
        super(createInitialState());
    }
}
