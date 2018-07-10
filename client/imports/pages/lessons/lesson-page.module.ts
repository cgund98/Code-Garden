import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MiscCompsModule } from '../misc/misc-comps.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AceEditorModule } from 'ng2-ace-editor';
import { HttpClientModule } from '@angular/common/http';


import { LessonShowPageComponent } from './lesson-show-page.component';

import { LESSON_ELEMENTS_DECLARATIONS } from './lesson-elements';

@NgModule({
  imports: [
    BrowserModule,
    MiscCompsModule,
    ReactiveFormsModule,
    FormsModule,
    AceEditorModule,
    HttpClientModule,
  ],
  declarations: [
    LessonShowPageComponent,
    ...LESSON_ELEMENTS_DECLARATIONS,
  ],
  entryComponents: [
    LessonShowPageComponent,
    LessonCreatePageComponent,
    ...LESSON_ELEMENTS_DECLARATIONS,
  ],
  exports: [
    LessonShowPageComponent,
    LessonCreatePageComponent,
    ...LESSON_ELEMENTS_DECLARATIONS,
  ]
})

export class LessonPageModule {}
