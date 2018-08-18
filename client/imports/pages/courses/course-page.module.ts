import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { MiscCompsModule } from '../misc/misc-comps.module';
import { LessonPageModule } from '../lessons/lesson-page.module.ts';

import { CourseShowPageComponent } from './course-show-page.component';
import { CoursesShowPageComponent } from './courses-show-page.component';
import { CourseCreatePageComponent } from './course-create-page.component';
import { CourseEditPageComponent } from './course-edit-page.component';

import { COURSE_ELEMENTS_DECLARATIONS } from './course-elements';


@NgModule({
  imports: [
    BrowserModule,
    LessonPageModule,
    MiscCompsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxPaginationModule,
  ],
  declarations: [
    CourseShowPageComponent,
    CourseCreatePageComponent,
    CourseEditPageComponent,
    CoursesShowPageComponent,
    ...COURSE_ELEMENTS_DECLARATIONS,
  ],
  entryComponents: [
    CourseShowPageComponent,
    CourseCreatePageComponent,
    CourseEditPageComponent,
    CoursesShowPageComponent,
    ...COURSE_ELEMENTS_DECLARATIONS,
  ],
  exports: [
    CourseShowPageComponent,
    CourseCreatePageComponent,
    CourseEditPageComponent,
    CoursesShowPageComponent,
    ...COURSE_ELEMENTS_DECLARATIONS,
  ]
})

export class CoursePageModule {}
