import { TextFieldModule } from '@angular/cdk/text-field';

import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
// import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/navigation/sidebar/sidebar.component';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './control/button/button.component';
import { SvgDefinitionsComponent } from './control/svg-definitions/svg-definitions.component';
import { SvgIconComponent } from './control/svg-icon/svg-icon.component';
import { InputComponent } from './control/input/input.component';
import { AvatarComponent } from './control/avatar/avatar.component';
import { AddIssueModalComponent } from './components/add-issue-modal/add-issue-modal.component';
import { IssueAssigneesSelectComponent } from './components/add-issue-modal/issue-assignees-select/issue-assignees-select.component';

import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { UserComponent } from './components/user/user.component';
import { IssuePrioritySelectComponent } from './components/add-issue-modal/issue-priority-select/issue-priority-select.component';
import { IssueReporterSelectComponent } from './components/add-issue-modal/issue-reporter-select/issue-reporter-select.component';
import { IssueTypeSelectComponent } from './components/add-issue-modal/issue-type-select/issue-type-select.component';
import { QuillModule } from 'ngx-quill';
import { ResizerComponent } from './components/navigation/resizer/resizer.component';
import { SearchDrawerComponent } from './components/navigation/navbar-left/search-drawer/search-drawer.component';
import { IssueModalComponent } from './components/issue/issue-modal/issue-modal.component';
import { IssueDetailComponent } from './components/issue/issue-detail/issue-detail.component';
import { IssueDeleteModalComponent } from './components/issue/issue-delete-modal/issue-delete-modal.component';
import { IssueResultComponent } from './components/navigation/navbar-left/issue-result/issue-result.component';
import { SharedDirectivesModule } from '@tan2k/shared/directives/shared-directives.module';
import { IssueTypeComponent } from './components/issue/issue-type/issue-type.component';
import { BoardDndComponent } from './components/board/board-dnd/board-dnd.component';
import { BoardDndListComponent } from './components/board/board-dnd-list/board-dnd-list.component';
import { BoardFilterComponent } from './components/board/board-filter/board-filter.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { IssueCardComponent } from './components/issue/issue-card/issue-card.component';
import { BoardComponent } from './page/board/board.component';
import { BreadcrumbsComponent } from './control/breadcrumbs/breadcrumbs.component';
import { IssueTitleComponent } from './components/issue/issue-title/issue-title.component';
import { NavigationComponents } from '@tan2k/protected-zone/components/navigation';
import { IssueLoaderComponent } from './components/issue/issue-loader/issue-loader.component';
import { IssuePriorityComponent } from './components/issue/issue-priority/issue-priority.component';
import { IssueDescriptionComponent } from './components/issue/issue-description/issue-description.component';
import { IssueReporterComponent } from './components/issue/issue-reporter/issue-reporter.component';
import { IssueStatusComponent } from './components/issue/issue-status/issue-status.component';
import { NZ_JIRA_ICONS } from '@tan2k/shared/config/icon';
import { BoardPageComponents } from '@tan2k/protected-zone/components/board';
import { IssueUtilComponents } from '@tan2k/protected-zone/components/issue';
import { IssueCommentsComponent } from './components/issue/issue-comments/issue-comments.component';
import { IssueCommentComponent } from './components/issue/issue-comment/issue-comment.component';
import { IssueAssigneesComponent } from './components/issue/issue-assignees/issue-assignees.component';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { AutofocusDirective } from './directives/autofocus.directive';
import { NotificationService } from '@tan2k/shared/services';
import { FullIssueDetailComponent } from './page/full-issue-detail/full-issue-detail.component';
import { SettingsComponent } from './page/settings/settings.component';
import { IssueAttachmentsComponent } from './components/issue/issue-attachments/issue-attachments.component';
import { UserSettingsComponent } from './page/user-settings/user-settings.component';
import { ThemeTogglerModule } from './components/theme-toggler/theme-toggler.module';
import { IssueExpirationDateComponent } from './components/issue/issue-expiration-date/issue-expiration-date.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';

import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzGridModule } from 'ng-zorro-antd/grid';


@NgModule({
    imports: [CommonModule, LayoutRoutingModule, FormsModule, ReactiveFormsModule, NzSelectModule, TextFieldModule,
        NzDropDownModule, NzNotificationModule, NzDrawerModule,
        NzPopoverModule, NzModalModule, NzIconModule.forChild(NZ_JIRA_ICONS), ContentLoaderModule,
        QuillModule, NzToolTipModule, NzIconModule, SharedDirectivesModule, DragDropModule, NzUploadModule,
        ThemeTogglerModule, NzDatePickerModule, NzTimePickerModule, NzRadioModule, NzButtonModule, NzSpaceModule, NzTabsModule, NzGridModule],
    declarations: [
        AutofocusDirective, LayoutComponent, SidebarComponent, ButtonComponent, SvgDefinitionsComponent,
        ...BoardPageComponents, ...IssueUtilComponents,
        SvgIconComponent, InputComponent, AvatarComponent, ...NavigationComponents, AddIssueModalComponent,
        IssueAssigneesSelectComponent, UserComponent,
        IssuePrioritySelectComponent, IssueReporterSelectComponent, IssueTypeSelectComponent, ResizerComponent,
        SearchDrawerComponent, IssueModalComponent, IssueDetailComponent, IssueDeleteModalComponent, IssueResultComponent,
        IssueTypeComponent, BoardDndComponent, BoardDndListComponent, BoardFilterComponent, IssueCardComponent,
        BoardComponent, BreadcrumbsComponent, IssueTitleComponent, IssueLoaderComponent, IssuePriorityComponent,
        IssueDescriptionComponent, IssueReporterComponent, IssueStatusComponent, IssueCommentsComponent,
        IssueCommentComponent, IssueAssigneesComponent, FullIssueDetailComponent, SettingsComponent, IssueAttachmentsComponent, UserSettingsComponent, IssueExpirationDateComponent,],
    providers: [
        NotificationService,
        DatePipe
    ]
})
export class LayoutModule { }
