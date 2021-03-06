import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MiscCompsModule } from '../misc/misc-comps.module';
import { ManageAccountPageComponent } from './manage-account-page.component';
import { LoginPageComponent } from './login-page.component';
import { SignupPageComponent } from './signup-page.component';
import { ForgotPasswordPageComponent } from './forgot-password-page.component';
import { LogoutComponent } from './logout.component';

import { USER_ELEMENTS_DECLARATIONS } from './user-elements';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MiscCompsModule,
    RouterModule,
  ],
  declarations: [
    LoginPageComponent,
    SignupPageComponent,
    LogoutComponent,
    ForgotPasswordPageComponent,
    ManageAccountPageComponent,
    ...USER_ELEMENTS_DECLARATIONS,
  ],
  entryComponents: [
    LoginPageComponent,
    SignupPageComponent,
    LogoutComponent,
    ForgotPasswordPageComponent,
    ManageAccountPageComponent,
  ],
  exports: [
    LoginPageComponent,
    SignupPageComponent,
    LogoutComponent,
    ForgotPasswordPageComponent,
    ManageAccountPageComponent,
  ]
})

export class UserPageModule {}
