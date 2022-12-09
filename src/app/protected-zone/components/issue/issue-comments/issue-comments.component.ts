import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Issue } from '@tan2k/shared/models';

@Component({
  selector: 'app-issue-comments',
  templateUrl: './issue-comments.component.html',
  styleUrls: ['./issue-comments.component.scss']
})
export class IssueCommentsComponent implements OnInit {
  @Input() issue: Issue;

  constructor() { }

  ngOnInit(): void {
  }

}
