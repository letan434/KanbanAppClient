import { Component, Input, OnInit } from '@angular/core';
import { MessageConstants } from '@tan2k/shared/constants';
import { Attachments, Issue } from '@tan2k/shared/models';
import { AuthService, NotificationService, ProjectsService } from '@tan2k/shared/services';

import { NzModalService } from 'ng-zorro-antd/modal';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-issue-attachments',
  templateUrl: './issue-attachments.component.html',
  styleUrls: ['./issue-attachments.component.scss']
})
export class IssueAttachmentsComponent implements OnInit {
  @Input() issue: Issue;
  isWorking: boolean;
  envUrl: string;
  constructor(private projectService: ProjectsService, private notificationService: NotificationService,
    private _modalService: NzModalService
 , private authService: AuthService) { }

  ngOnInit(): void {
    this.envUrl = environment.authroityUrl + "/";
    if(this.authService.profile.role == "Admin")
    this.isWorking = true;
    console.log(this.authService.profile);

  }

  selectFile(event) {
    var formData = new FormData();
    formData.append("id", this.issue.id);
    formData.append('file', event.target.files[0]);

    this.projectService.updateIssueAttachments(formData).subscribe(
      (value) => {
        if(value.type == 4){
        this.projectService.getDetail(localStorage.getItem('projectCurrentId'));
        this.notificationService.showSuccess(MessageConstants.UPLOAD_OK_MSG);
        }
      },
      (error) => {
        console.log(error);

      }
    );
  }
  removeAttach(attach: Attachments){
    if(this.authService.profile.role == "Admin" || this.authService.profile.role[0] == "Admin"){
      console.log(attach);
      this.projectService.removeAttach(attach.id).subscribe(
        (value)=>{
          if(value) {this.notificationService.showSuccess(MessageConstants.DELETED_OK_MSG);
            this.projectService.getDetail(localStorage.getItem('projectCurrentId'));
          }

        }, (error) =>{
          this.notificationService.showError(MessageConstants.SYSTEM_ERROR_MSG);
        }
      )
    }
    else{
      this.notificationService.showError(MessageConstants.ROLE_ERROR_MSG);
    }

  }
}
