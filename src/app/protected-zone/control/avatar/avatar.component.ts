import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {

    @Input() avatarUrl: string;
    @Input() size = 16;
    @Input() name = '';
    @Input() rounded = true;
    @Input() className = '';
    
    get style() {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`,
        'background-image': `url('${environment.authroityUrl}/${this.avatarUrl}')`,
        'border-radius': this.rounded ? '100%' : '3px'
      };
      ''
    }

}
