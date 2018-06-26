import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoginShowPageComponent } from './login-show-page.component';

import { LOGIN_ELEMENTS_DECLARATIONS } from './login-elements';

@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [
    LoginShowPageComponent,
    ...LOGIN_ELEMENTS_DECLARATIONS,
  ],
  entryComponents: [
    LoginShowPageComponent,
  ],
  exports: [
    LoginShowPageComponent,
  ]
})

export class LoginPageModule {}
