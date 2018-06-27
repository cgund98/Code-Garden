import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MiscCompsModule } from '../misc/misc-comps.module';
import { LessonShowPageComponent } from './lesson-show-page.component';

import { LESSON_ELEMENTS_DECLARATIONS } from './lesson-elements';

@NgModule({
  imports: [
    BrowserModule,
    MiscCompsModule,
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
