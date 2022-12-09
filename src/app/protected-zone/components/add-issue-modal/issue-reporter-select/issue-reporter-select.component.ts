import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {User} from '@tan2k/shared/models';

@Component({
  selector: 'app-issue-reporter-select',
  templateUrl: './issue-reporter-select.component.html',
  styleUrls: ['./issue-reporter-select.component.scss']
})
export class IssueReporterSelectComponent implements OnInit {

    @Input() control: FormControl;
    @Input() users: User[];

    constructor() {}

    ngOnInit(): void {}

    getUser(userId: string) {
        return this.users.find((user) => user.id === userId);
    }

}
