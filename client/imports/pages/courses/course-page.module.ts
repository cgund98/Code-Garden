import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CourseShowPageComponent } from './course-show-page.component';
import { COURSE_ELEMENTS_DECLARATIONS } from './course-elements';

@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [
    CourseShowPageComponent,
    ...COURSE_ELEMENTS_DECLARATIONS,
  ],
  entryComponents: [
    CourseShowPageComponent,
  ],
  exports: [
    CourseShowPageComponent,
  ]
})

export class CoursePageModule {}
