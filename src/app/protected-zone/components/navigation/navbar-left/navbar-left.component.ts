import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzModalService
  } from 'ng-zorro-antd/modal';
import { AddIssueModalComponent } from '@tan2k/protected-zone/components/add-issue-modal/add-issue-modal.component';
import { SearchDrawerComponent } from '@tan2k/protected-zone/components/navigation/navbar-left/search-drawer/search-drawer.component';
import { Project, ProjectQuick, User } from '@tan2k/shared/models';
import { AuthService, ProjectsService, UsersService } from '@tan2k/shared/services';
import { AuthQuery } from '@tan2k/shared/state/auth/auth.query';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar-left',
  templateUrl: './navbar-left.component.html',
  styleUrls: ['./navbar-left.component.scss']
})
export class NavbarLeftComponent implements OnInit {
  items: NavItem[];
  userCurrent: User;
  public pushRightClass: string;

  isAuthenticated: boolean;
  subscription: Subscription;
  public projects: ProjectQuick[];
  public currentId: string;
  constructor(
    public authQuery: AuthQuery,
    private _drawerService: NzDrawerService,
    private _modalService: NzModalService
 ,
    private authService: AuthService,
    private usersService: UsersService,
    private router: Router,
    private projectsService: ProjectsService
  ) {
    this.subscription = this.authService.authNavStatus$.subscribe(x => this.isAuthenticated = x);
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
        this.toggleSidebar();
      }
    });
  }
  isToggled(): boolean {
    const dom: Element = document.querySelector('body');
    return dom.classList.contains(this.pushRightClass);
  }
  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
  }

  ngOnInit(): void {
    this.pushRightClass = 'push-right';

    this.items = [
      new NavItem('search', 'Search issues', this.openSearchDrawler.bind(this)),
      new NavItem('plus', 'Create issue', this.openCreateIssueModal.bind(this))
    ];
    this.loadProjectIds();
  }
  loadProjectIds() {
    this.currentId = this.authService.profile.sub;
    this.usersService.getProjects(this.currentId).subscribe(value => {
      this.projects = value;
      if(localStorage.getItem("projectCurrentId")== undefined || localStorage.getItem("projectCurrentId") == '' || localStorage.getItem("projectCurrentId") == null){
      this.projectsService.getDetail(value[1].id);
      this.projectsService.GetUserCurrent(value[1].id, this.authService.profile.sub);
      localStorage.setItem("projectCurrentId", value[1].id);
      }
    }, (e) => { console.log(e); });
  }
  openCreateIssueModal() {
    this._modalService.create({
      nzContent: AddIssueModalComponent,
      nzClosable: false,
      nzFooter: null,
      nzWidth: 700
    });
  }

  openSearchDrawler() {
    this._drawerService.create({
      nzContent: SearchDrawerComponent,
      nzTitle: null,
      nzPlacement: 'left',
      nzClosable: false,
      nzWidth: 500
    });
  }
  async signout() {
    await this.authService.signout();
  }
  setLocalProjecId(projectId) {
    this.projectsService.getDetail(projectId);
    localStorage.setItem('projectCurrentId', projectId);
    this.router.navigateByUrl('/board');
  }
  settingsUser(){
    this.router.navigateByUrl('/user-settings');
  }
}


class NavItem {
  constructor(public icon: string, public tooltip: string, public handler: Handler) { }
}

type Handler = () => void;
