import { Injectable } from "@angular/core";
import { ProjectStore } from "./project.store";
import { StatusModel } from "../models";


@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    constructor(private store: ProjectStore) {}
    updateStatuses = (status: StatusModel[]) => {
        const raw = this.store.getValue();
        raw.statuses.filter(x => {
            var index= status.indexOf(x);
            if(index != -1){
                x.noDisabled = true;
            }
        });
    }
}
