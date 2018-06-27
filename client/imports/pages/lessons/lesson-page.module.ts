import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MiscCompsModule } from '../misc/misc-comps.module';
import { LessonShowPageComponent } from './lesson-show-page.component';
import { LessonCreatePageComponent } from './lesson-create-page.component';

import { LESSON_ELEMENTS_DECLARATIONS } from './lesson-elements';

@NgModule({
  imports: [
    BrowserModule,
    MiscCompsModule,
  ],
  declarations: [
    LessonShowPageComponent,
    LessonCreatePageComponent,
    ...LESSON_ELEMENTS_DECLARATIONS,
  ],
  entryComponents: [
    LessonShowPageComponent,
    LessonCreatePageComponent,
  ],
  exports: [
    LessonShowPageComponent,
    LessonCreatePageComponent,
  ]
})

export class LessonPageModule {}
