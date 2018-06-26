import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MiscCompsModule } from '../misc/misc-comps.module';

import { CourseShowPageComponent } from './course-show-page.component';
import { CourseCreatePageComponent } from './course-create-page.component';

import { COURSE_ELEMENTS_DECLARATIONS } from './course-elements';

@NgModule({
  imports: [
    BrowserModule,
    MiscCompsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    CourseShowPageComponent,
    CourseCreatePageComponent,
    ...COURSE_ELEMENTS_DECLARATIONS,
  ],
  entryComponents: [
    CourseShowPageComponent,
    CourseCreatePageComponent,
  ],
  exports: [
    CourseShowPageComponent,
    CourseCreatePageComponent,
  ]
})

export class CoursePageModule {}
