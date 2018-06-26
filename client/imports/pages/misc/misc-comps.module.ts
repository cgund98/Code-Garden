import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { LessonShowPageComponent } from './lesson-show-page.component';

import { MISC_ELEMENTS_DECLARATIONS } from './';

@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [
    // LessonShowPageComponent,
    ...MISC_ELEMENTS_DECLARATIONS,
  ],
  entryComponents: [
    // LessonShowPageComponent,
  ],
  exports: [
    // LessonShowPageComponent,
  ]
})

export class MiscCompsModule {}
