import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ParticlesModule } from 'angular-particle';
// import { LessonShowPageComponent } from './lesson-show-page.component';

import { MISC_ELEMENTS_DECLARATIONS } from './';

@NgModule({
  imports: [
    BrowserModule,
    ParticlesModule,
  ],
  declarations: [
    // LessonShowPageComponent,
    ...MISC_ELEMENTS_DECLARATIONS,
  ],
  entryComponents: [
    // LessonShowPageComponent,
    ...MISC_ELEMENTS_DECLARATIONS,
  ],
  exports: [
    // LessonShowPageComponent,
    ...MISC_ELEMENTS_DECLARATIONS,
  ]
})

export class MiscCompsModule {}
