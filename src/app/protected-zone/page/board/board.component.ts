import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService, ProjectsService } from '@tan2k/shared/services';
import { ProjectQuery } from '@tan2k/shared/state/project.query';
import { Subscription } from 'rxjs';
import {untilDestroyed} from '@ngneat/until-destroy';
@Component({
    // tslint:disable-next-line:component-selector
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy, OnChanges {

    breadcrumbs: string[] = ['Projects', 'Kanban Board'];
    constructor(private projectsService: ProjectsService, private authService: AuthService,
        private activeRoute: ActivatedRoute, private projectQuery: ProjectQuery
        ) {
    }
    public projectCurrentId;
    private subscription: Subscription[] = [];
    ngOnInit(): void {
      console.log(111111111);
      
        // this.subscription.push(this.activeRoute.params.subscribe(params => {
        //     this.projectCurrentId = params['id'];
        //   }));
        // if (!this.projectCurrentId) {
        this.projectCurrentId = localStorage.getItem('projectCurrentId');
        // }
        // setInterval(() => this.projectsService.getDetail(this.projectCurrentId), 10000);
        // setInterval(() => console.log(111222222222222)
        // , 10000);
        this.projectsService.getDetail(this.projectCurrentId);
        this.projectsService.GetUserCurrent(this.projectCurrentId, this.authService.profile.sub);
        this.projectQuery.all$.subscribe(value => {
          if (value.name) {
            if (this.breadcrumbs.indexOf(value.name) === -1) {
            this.breadcrumbs.push(value.name);
            }
          }
        });
    }

    sendTwitterEventButton() {
        // this._googleAnalytics.sendEvent("Share Twitter", "button")
    }
    ngOnDestroy(): void {
        this.subscription.forEach((value) => {
            value.unsubscribe();
        });
    }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(222222);
    
    this.projectsService.getDetail(this.projectCurrentId);
  }

}
