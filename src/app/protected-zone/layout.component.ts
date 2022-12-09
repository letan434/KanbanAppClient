import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    expanded: boolean;

    constructor() {
        this.expanded = true;
    }
    ngOnInit() {
        this.handleResize();
    }
    handleResize() {
        const match = window.matchMedia('(min-width: 1024px)');
        match.addEventListener('change', (e) => {
            console.log(e);
            this.expanded = e.matches;
        });
    }
    manualToggle() {
        this.expanded = !this.expanded;
    }
}
