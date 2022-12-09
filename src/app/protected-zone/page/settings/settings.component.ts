import { Component, OnInit } from '@angular/core';
import {Category, Project} from '@tan2k/shared/models';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ProjectConst} from '@tan2k/shared/config/const';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import {ProjectQuery} from '@tan2k/shared/state/project.query';
import {Router} from '@angular/router';
import {NoWhitespaceValidator} from '@tan2k/shared/config/no-whitespace.validator';
import {AuthService, NotificationService, ProjectsService, UtilitiesService} from '@tan2k/shared/services';
import {CategoriesService} from '@tan2k/shared/services/categories.service';
import { environment } from 'src/environments/environment';
import { MessageConstants } from '@tan2k/shared/constants';

@Component({
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
@UntilDestroy()
export class SettingsComponent implements OnInit {

  project: Project;
  projectForm: FormGroup;
  categories: Category[];
  public selectedFile: File;
  get breadcrumbs(): string[] {
    return [ProjectConst.Projects, this.project?.name, 'Settings'];
  }
  public projectId: string;
  envUrl: string;

  public urlImg: any;
  constructor(
      private _projectQuery: ProjectQuery,
      private _projectService: ProjectsService,
      private _categoryService: CategoriesService,
      private _notification: NzNotificationService,
      private _fb: FormBuilder,
      private _router: Router,
      private utilitiesService: UtilitiesService,
      private authservice: AuthService,
      private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this._projectService.getDetail(localStorage.getItem('projectCurrentId'));
    this._projectService.GetUserCurrent(localStorage.getItem('projectCurrentId'), this.authservice.profile.sub);
    this.initForm();
    this._categoryService.getAll().subscribe(
        value => this.categories = value
    );
    this.projectId = localStorage.getItem('projectCurrentId');
    this._projectQuery.all$.pipe(untilDestroyed(this)).subscribe((project) => {
      this.project = project;
      this.updateForm(project);
    });
    this.envUrl = environment.authroityUrl + "/";
  }

  initForm() {
    this.projectForm = this._fb.group({
      name: ['', NoWhitespaceValidator()],
      url: null,
      description: [''],
      categoryId: [this.project?.categoryId]
    });
  }

  updateForm(project: Project) {
    this.projectForm.patchValue({
      name: project.name,
      //url: project.url,
      description: project.description,
      categoryId: project.categoryId
    });
  }
  onFileChanged(event) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
      const reader = new FileReader();
        reader.onload =(event) =>{
            this.urlImg = event.target.result;
        }
    reader.readAsDataURL(event.target.files[0])

    }
  }
  submitForm() {
    const formValue: Partial<Project> = this.projectForm.getRawValue();
    formValue.id = this.projectId;
    const formData = this.utilitiesService.ToFormData(formValue);
    if(this.selectedFile){
      formData.append('avatarUrl', this.selectedFile, this.selectedFile.name);}
    this._projectService.updateProject(this.projectId, formData).subscribe(
      (value)=>{
        console.log(value);
        if(value.type == 4){
          if(value) this.notificationService.showSuccess(MessageConstants.UPDATED_OK_MSG);
        }
      }
    );
    // this._notification.create(
    //     'success',
    //     'Changes have been saved successfully.',
    //     ''
    // );
  }

  cancel() {
    this._router.navigate(['/']);
  }

}
