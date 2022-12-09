import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import {AuthGuard} from '../shared/guard';
import {BoardComponent} from '@tan2k/protected-zone/page/board/board.component';
import {ProjectConst} from '@tan2k/shared/config/const';
import {FullIssueDetailComponent} from '@tan2k/protected-zone/page/full-issue-detail/full-issue-detail.component';
import {SettingsComponent} from '@tan2k/protected-zone/page/settings/settings.component';
import {UserSettingsComponent} from '@tan2k/protected-zone/page/user-settings/user-settings.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'board',
                component: BoardComponent
            },
            {
                path: 'board/:id',
                component: BoardComponent
            },
            {
                path: `project/issue/:${ProjectConst.IssueId}`,
                component: FullIssueDetailComponent
            },
          {
            path: 'settings',
            component: SettingsComponent
          },
          {
            path: 'user-settings',
            component: UserSettingsComponent
          },
            {
                path: '',
                redirectTo: 'board',
                pathMatch: 'full'
            }]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
