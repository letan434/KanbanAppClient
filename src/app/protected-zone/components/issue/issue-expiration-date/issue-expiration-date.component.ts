import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MessageConstants } from '@tan2k/shared/constants';
import { Issue } from '@tan2k/shared/models';
import { NotificationService, ProjectsService } from '@tan2k/shared/services';

@Component({
  selector: 'app-issue-expiration-date',
  templateUrl: './issue-expiration-date.component.html',
  styles: [
    `
      nz-date-picker,
      nz-range-picker {
        margin: 0 8px 12px 0;
      }
    `
  ]
})
export class IssueExpirationDateComponent implements OnInit {
  @Input() issue: Issue;
  descriptionControl: FormControl;
  isEditing: boolean;
  isWorking: boolean = true;
  dateExpiration: Date[] = [];

  constructor(private _projectService: ProjectsService,  private notificationService: NotificationService,) {
  }

  ngOnInit(): void {
    console.log(22222222,this.issue);
    if(this.issue.startDate){
      this.dateExpiration.push(
        new Date(this.issue.startDate)
      );
    }
    if(this.issue.endDate){
      this.dateExpiration.push(
        new Date(this.issue.endDate)
      );
    }
  }
  onChange(result: Date[]): void {
    console.log('Selected Time: ', result);
    this.dateExpiration = result;
  }

  onOk(result){
    console.log(result);

  }

  onCalendarChange(result: Array<Date | null>): void {
    console.log('onCalendarChange', result);
    if (result && result.length > 0) {
      this.dateExpiration = result;
    }
  }
  save(){
    console.log(this.dateExpiration);
    // const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };

    if(this.dateExpiration.length >0){
      this._projectService.updateIssueDateExpiration({
        ...this.issue,
        startDate: this.dateExpiration[0],
        endDate:  this.dateExpiration[1],
      }).subscribe(value=>{
        console.log(value);
        if(value){
          this.notificationService.showSuccess(MessageConstants.UPDATED_OK_MSG);
        }
      },
      (err)=>{
        this.notificationService.showError(MessageConstants.SYSTEM_ERROR_MSG);

      })
    }

  }
}
