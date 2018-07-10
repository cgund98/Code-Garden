import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MiscCompsModule } from '../misc/misc-comps.module';
import { LoginShowPageComponent } from './login-show-page.component';

import { LOGIN_ELEMENTS_DECLARATIONS } from './login-elements';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MiscCompsModule,
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
