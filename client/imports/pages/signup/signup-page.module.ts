import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MiscCompsModule } from '../misc/misc-comps.module';
import { SignupShowPageComponent } from './signup-show-page.component';


import { SIGNUP_ELEMENTS_DECLARATIONS } from './signup-elements';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MiscCompsModule,
  ],
  declarations: [
    SignupShowPageComponent,
    ...SIGNUP_ELEMENTS_DECLARATIONS,
  ],
  entryComponents: [
    SignupShowPageComponent,
  ],
  exports: [
    SignupShowPageComponent,
  ]
})

export class SignupPageModule {}
