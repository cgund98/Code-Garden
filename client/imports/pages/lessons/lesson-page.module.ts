import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MiscCompsModule } from '../misc/misc-comps.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AceEditorModule } from 'ng2-ace-editor';
import { HttpClientModule } from '@angular/common/http';


import { LessonShowPageComponent } from './lesson-show-page.component';
import { LessonCreatePageComponent } from './lesson-create-page.component';
import { LessonEditPageComponent } from './lesson-edit-page.component';

import { LESSON_ELEMENTS_DECLARATIONS } from './lesson-elements';

@NgModule({
  imports: [
    BrowserModule,
    MiscCompsModule,
    ReactiveFormsModule,
    FormsModule,
    AceEditorModule,
    HttpClientModule,
    RouterModule
  ],
  declarations: [
    LessonShowPageComponent,
    LessonCreatePageComponent,
    LessonEditPageComponent,
    ...LESSON_ELEMENTS_DECLARATIONS,
  ],
  entryComponents: [
    LessonShowPageComponent,
    LessonCreatePageComponent,
    LessonEditPageComponent,
    ...LESSON_ELEMENTS_DECLARATIONS,
  ],
  exports: [
    LessonShowPageComponent,
    LessonCreatePageComponent,
    LessonEditPageComponent,
    ...LESSON_ELEMENTS_DECLARATIONS,
  ]
})

export class LessonPageModule {}
