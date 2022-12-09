import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  Input,
} from '@angular/core';
import { ThemeService } from '@tan2k/shared/services';

@Component({
  selector: 'app-theme-toggler',
  template: `
    <div class="w-full h-full text-2xl">
      <span *ngIf="current === 'dark'; else light">🌜</span>
      <ng-template #light>
        <span>🌞</span>
      </ng-template>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeTogglerComponent {
  @Input() positionClass: string;

  // For disabling Angular
  // @HostBinding('id') togglerId = 'themeToggler';

  @HostBinding('class') get themeTogglerClasses() {
    return (
      'w-10 h-10 lg:flex lg:items-center lg:justify-center cursor-pointer' +
      ' ' +
      this.positionClass
    );
  }

  @HostBinding('attr.aria-label') ariaLabel = 'Dark and Light mode toggle button';

  @HostListener('click')
  onClick() {
    this.themeService.update();
    this.current = this.themeService.scheme;
  }

  current = this.themeService.scheme;

  constructor(private readonly themeService: ThemeService) {}
}
