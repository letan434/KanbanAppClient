import { Component, OnInit } from '@angular/core';
import {User, UserUpdate} from '@tan2k/shared/models';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ProjectConst} from '@tan2k/shared/config/const';
import {AuthService, NotificationService, ProjectsService, UsersService, UtilitiesService} from '@tan2k/shared/services';
import {Router} from '@angular/router';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {NoWhitespaceValidator} from '@tan2k/shared/config/no-whitespace.validator';
import {AuthQuery} from '@tan2k/shared/state/auth/auth.query';
import { environment } from 'src/environments/environment';
import { MessageConstants } from '@tan2k/shared/constants';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
@UntilDestroy()
export class UserSettingsComponent implements OnInit {

  user: User;
  projectForm: FormGroup;
  public selectedFile: File;
  public urlImg: any;
  envUrl: string;
  get breadcrumbs(): string[] {
    return [ProjectConst.Users, this.user?.userName, 'User-Settings'];
  }
  public userId: string;

  constructor(
      private _userService: UsersService,
      private _fb: FormBuilder,
      private _router: Router,
      private authQuery: AuthQuery,
      private utilitiesService: UtilitiesService,
      private _projectService: ProjectsService,
      private authservice: AuthService,
      private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this._projectService.GetUserCurrent(localStorage.getItem('projectCurrentId'), this.authservice.profile.sub);
    this._projectService.getDetail(localStorage.getItem('projectCurrentId'));
    this.initForm();
    this.authQuery.user$.pipe(untilDestroyed(this)).subscribe((user) => {
      this.user = user;
      this.updateForm(this.user);
      this.userId = user.id;
    });
    this.envUrl = environment.authroityUrl + "/";
  }

  initForm() {
    this.projectForm = this._fb.group({
      userName: ['', NoWhitespaceValidator()],
      firstName: ['', NoWhitespaceValidator()],
      lastName: ['', NoWhitespaceValidator()],
      avatarUrl: null,
      email: ['']
    });
  }
  onFileChanged(event) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      const reader = new FileReader();
        reader.onload =(event) =>{
            this.urlImg = event.target.result;
        }
    reader.readAsDataURL(event.target.files[0])

    }
  }
  updateForm(user: User) {
    this.projectForm.patchValue({
      userName: user.userNameMain,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    });
  }

  submitForm() {
    const formValue = this.projectForm.getRawValue();
    formValue.id = this.userId;
    const formData = this.utilitiesService.ToFormData(formValue);
    if(this.selectedFile){
    formData.append('avatarUrl', this.selectedFile, this.selectedFile.name);}
    this._userService.updateFe(this.userId, formData).subscribe(
      value =>{
        if(value.type == 4){
          if(value) this.notificationService.showSuccess(MessageConstants.UPDATED_OK_MSG);
        }
      }
    )
  }

  cancel() {
    this._router.navigate(['/']);
  }
}
