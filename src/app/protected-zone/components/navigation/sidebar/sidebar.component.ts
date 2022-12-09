import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {Project, ProjectQuick, SideBarLink, User} from '../../../../shared/models';
import {SideBarLinks} from '@tan2k/shared/config/sidebar';
import {ProjectQuery} from '@tan2k/shared/state/project.query';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
@UntilDestroy()
export class SidebarComponent implements OnInit {
    project: Project;
    @Input() expanded: boolean;
    sideBarLinks: SideBarLink[];
    constructor(private _projectQuery: ProjectQuery, public router: Router) {
        this._projectQuery.all$.pipe(untilDestroyed(this)).subscribe((project) => {
            this.project = project;
            //console.log(project);            
        });
    }
    get sidebarWidth(): number {
      return this.expanded ? 240 : 15;
    }
    ngOnInit() {
        this.sideBarLinks = SideBarLinks;
    }
}
