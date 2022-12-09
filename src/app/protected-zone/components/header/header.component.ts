import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {AuthService, UsersService} from '../../../shared/services';
import { Subscription } from 'rxjs';
import {ProjectsService} from '@tan2k/shared/services/projects.service';
import {ProjectQuick, User} from '@tan2k/shared/models';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    userName: string;
    isAuthenticated: boolean;
    subscription: Subscription;
    open: boolean;
    projects: ProjectQuick[];
    project: ProjectQuick;
    userCurrent: User;
    public currentId: string;
    constructor(public router: Router,
        private authService: AuthService, private usersService: UsersService) {
            this.subscription = this.authService.authNavStatus$.subscribe(x => this.isAuthenticated = x);
            this.userName = this.authService.name;
            // this.router.events.subscribe((val) => {
            //     if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
            //         this.toggleSidebar();
            //     }
            // });

    }
    ngOnInit() {
        this.loadProjectIds();
    }
    loadProjectIds() {
        this.currentId = this.authService.profile.sub;
        console.log(this.currentId);
        // this.usersService.authUser(this.currentId).pipe().subscribe(
        //     value => {
        //         this.userCurrent = value;
        //         localStorage.setItem('currentUser', this.userCurrent.userName);
        //         localStorage.setItem('currentUserAvatar', this.userCurrent.avatarUrl);
        //     },
        //     error => console.log(error)
        // );
        this.usersService.getProjects(this.currentId).subscribe(value => {
            console.log(value);
            this.projects = value;
        }, (e) => {console.log(e); } );
    }
    setLocalProjecId(project: ProjectQuick) {
        localStorage.setItem('projectCurrentId', project.id.toString());
    }
    // isToggled(): boolean {
    //     const dom: Element = document.querySelector('body');
    //     return dom.classList.contains(this.pushRightClass);
    // }

    // toggleSidebar() {
    //     const dom: any = document.querySelector('body');
    //     dom.classList.toggle(this.pushRightClass);
    // }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    async signout() {
        await this.authService.signout();
        localStorage.clear();
    }
}
