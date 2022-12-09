import { Component, OnInit } from '@angular/core';
import {ProjectQuery} from '@tan2k/shared/state/project.query';
import { AuthQuery } from '@tan2k/shared/state/auth/auth.query';

@Component({
  selector: 'app-board-dnd',
  templateUrl: './board-dnd.component.html',
  styleUrls: ['./board-dnd.component.scss']
})
export class BoardDndComponent implements OnInit {

    constructor(public projectQuery: ProjectQuery,
        public authQuery: AuthQuery) {}

    ngOnInit(): void {
    }

}
