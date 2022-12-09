import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-svg-icon',
  templateUrl: './svg-icon.component.html',
})
export class SvgIconComponent {

    @Input() name: String;
    @Input() size = 16;
    @Input() fill = 'currentColor';

    constructor() {}

    get iconUrl() {
        return `${window.location.href}#${this.name}`;
    }

}
