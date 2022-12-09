import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
    imports: [CommonModule, LoginRoutingModule],
    declarations: [LoginComponent],
    providers: [NgxSpinnerService]
})
export class LoginModule {}
