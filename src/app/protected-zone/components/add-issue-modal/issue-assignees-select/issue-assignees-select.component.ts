import {ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {User} from '@tan2k/shared/models';

@Component({
  selector: 'app-issue-assignees-select',
  templateUrl: './issue-assignees-select.component.html',
  styleUrls: ['./issue-assignees-select.component.scss'],
    encapsulation: ViewEncapsulation.None

})
export class IssueAssigneesSelectComponent implements OnInit {

    @Input() control: FormControl;
    @Input() users: User[];

    constructor(private cdr: ChangeDetectorRef) {}

    ngOnInit(): void {}

    getUser(userId: string) {
        return this.users.find((user) => user.id === userId);
    }

}
