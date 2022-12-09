import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { AuthInterceptor } from './shared/intercepters/auth.intercepter';
import { QuillModule } from 'ngx-quill';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';

import {LanguageTranslationModule} from '@tan2k/shared/modules/language-translation/language-translation.module';
import { ThemeTogglerModule } from './protected-zone/components/theme-toggler/theme-toggler.module';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import en from '@angular/common/locales/en';
registerLocaleData(en);

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NzIconModule.forRoot([]),
    QuillModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    LanguageTranslationModule,
    ThemeTogglerModule
  ],
  declarations: [AppComponent],
  providers: [AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { provide: NZ_I18N, useValue: en_US  } ],
  bootstrap: [AppComponent]
})
export class AppModule {}
