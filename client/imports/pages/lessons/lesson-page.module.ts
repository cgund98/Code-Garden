import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LessonShowPageComponent } from './lesson-show-page.component';

import { LESSON_ELEMENTS_DECLARATIONS } from './lesson-elements';

@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [
    LessonShowPageComponent,
    ...LESSON_ELEMENTS_DECLARATIONS,
  ],
  entryComponents: [
    LessonShowPageComponent,
  ],
  exports: [
    LessonShowPageComponent,
  ]
})

export class LessonPageModule {}
