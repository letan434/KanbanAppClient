import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {User} from '@tan2k/shared/models';
import {ProjectsService} from '@tan2k/shared/services/projects.service';
import {Comment} from '@tan2k/shared/models';
import { AuthQuery } from '@tan2k/shared/state/auth/auth.query';

@Component({
  selector: 'app-issue-comment',
  templateUrl: './issue-comment.component.html',
  styleUrls: ['./issue-comment.component.scss']
})
@UntilDestroy()
export class IssueCommentComponent implements OnInit {

    @Input() issueId: string;
    @Input() comment: Comment;
    @Input() createMode: boolean;
    @ViewChild('commentBoxRef') commentBoxRef: ElementRef;
    commentControl: FormControl;
    user: User;
    isEditing: boolean;
  
    constructor(
      private _authQuery: AuthQuery,
      private projectService: ProjectsService
    ) {}
  
    @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
      if (!this.createMode || this.isEditing) {
        return;
      }
      if (event.key === 'M') {
        this.commentBoxRef.nativeElement.focus();
        this.isEditing = true;
      }
    }
  
    ngOnInit(): void {
      this.commentControl = new FormControl('');
      this._authQuery.user$.pipe(untilDestroyed(this)).subscribe((user) => {
        this.user = user;
        if (this.createMode) {
          this.comment = new Comment(this.issueId, this.user);
        }
      });
    }
  
    setCommentEdit(mode: boolean) {
      this.isEditing = mode;
    }
    setChangeTxt(event){
      if(event.key === 'Enter') {
        this.addComment();   
        this.commentBoxRef.nativeElement.reset();
        this.setCommentEdit(false);
      }   
    }
    addComment() {
      const now = new Date();
      this.projectService.updateIssueComment(this.issueId, {
        ...this.comment,
        id: `${now.getTime()}`,
        createDate: now.toISOString(),
        lastModifiedDate: now.toISOString(),
        body: this.commentControl.value,
        userId: this.user.id
      });
      this.cancelAddComment();
    }
  
    cancelAddComment() {
      this.commentControl.patchValue('');
      this.setCommentEdit(false);
    }

}
